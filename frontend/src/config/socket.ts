import getWsToken from "../api/getWsToken";
import useMessageStore from "../store/useMessageStore";
import { DatabaseMessage, SocketMessage } from "../types/messages";
import { BACKEND_URL } from "./backendUrl";

let socket: WebSocket | null = null;
const connectToRoom = async (roomId: string) => {
  const url = new URL(BACKEND_URL);
  const host = url.host;
  const protocol = url.protocol === "https:" ? "wss" : "ws";
  const token = await getWsToken();

  socket = new WebSocket(
    `${protocol}://${host}/ws?roomId=${roomId}&token=${token}`,
  );
  socket.onopen = () => {
    // console.log(`connected to room ${roomId}`); //remove log
  };
  socket.onmessage = (event) => {
    // console.log(event.data); //check data sent by backend
    const parsed: DatabaseMessage = JSON.parse(event.data);
    console.log(parsed);
    useMessageStore.getState().addMessage(parsed);
  };
  socket.onclose = () => {
    // console.log(`Disconnected`); //remove log dosomething()
  };
  socket.onerror = (err) => {
    console.error(err); //showToast maybe>
  };
};

const sendMessage = (message: SocketMessage) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    useMessageStore.getState().addMessage(message);
    socket.send(JSON.stringify(message));
  } else {
    console.warn("WebSocket is not open. Cannot send message");
  }
};

const disconnect = () => {
  socket?.close();
};

export { connectToRoom, sendMessage, disconnect };
