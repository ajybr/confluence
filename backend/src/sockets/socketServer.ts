import { RawData, WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage, Server } from "http";
import jwt from "jsonwebtoken";

type RoomId = string;

const rooms = new Map<RoomId, Set<WebSocket>>();

export const setupWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const protocol = request.headers["x-forwarded-proto"] || "http";
    const requestUrl = new URL(
      request.url!,
      `${protocol}://${request.headers.host}`,
    );

    const token = requestUrl.searchParams.get("token");
    if (!token) {
      console.error("User not found! Invalid JWT");
      return socket.destroy();
    }

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      console.error("User not found! Invalid JWT");
      return socket.destroy();
    }

    const pathname = requestUrl.pathname;

    const roomId = requestUrl.searchParams.get("roomId");
    if (pathname !== "/ws" || !roomId) {
      console.error("Invalid pathname or Missing roomId");
      return socket.destroy();
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request, roomId);
    });
  });

  wss.on(
    "connection",
    (ws: WebSocket, req: IncomingMessage, roomId: RoomId) => {
      if (!(typeof roomId === "string")) {
        ws.close();
        return;
      }
      console.log(`Client connected to room ${roomId}`);

      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId)!.add(ws);

      ws.on("message", (msg: RawData) => {
        console.log(`Message in room ${roomId}:`, msg.toString());

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN)
            client.send(msg.toString());
        });
      });

      ws.on("close", () => {
        rooms.get(roomId)?.delete(ws);
        console.log(`Client disconnected from room ${roomId}`);
      });
    },
  );
};
