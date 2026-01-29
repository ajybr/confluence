import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import messageRoutes from "./routes/messageRoutes";
import wsTokenRoute from "./routes/wsTokenRoute";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setupWebSocketServer } from "./sockets/socketServer";
import http from "http";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://zealous-hill-073977c00.2.azurestaticapps.net",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);
setupWebSocketServer(server);

app.get("/api/health", (_, res) => {
  res.send("OK");
});

app.use("/api/v1/rooms", roomRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/messages", messageRoutes);

app.use("/api/v1", wsTokenRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server + socket running on http://localhost:${PORT}`);
});
