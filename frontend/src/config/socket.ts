import getWsToken from "../api/getWsToken";
import useMessageStore from "../store/useMessageStore";
import { DatabaseMessage, SocketMessage } from "../types/messages";
import { BACKEND_URL } from "./backendUrl";

let socket: WebSocket | null = null;
const connectToRoom = async (roomId: string) => {
  const token = await getWsToken();

  let wsUrl: string;
  if (BACKEND_URL) {
    const url = new URL(BACKEND_URL);
    const protocol = url.protocol === "https:" ? "wss" : "ws";
    wsUrl = `${protocol}://${url.host}/ws?roomId=${roomId}&token=${token}`;
  } else {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    wsUrl = `${protocol}://${window.location.host}/ws?roomId=${roomId}&token=${token}`;
  }

  socket = new WebSocket(wsUrl);
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
