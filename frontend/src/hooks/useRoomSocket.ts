import { useEffect, useRef, useState } from "react";
import useRoomStore from "../store/useRoomStore";

const useRoomSocket = () => {
  const { selectedRoom } = useRoomStore();
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!selectedRoom) return;

    const ws = new WebSocket(
      `ws://localhost:8080/ws/?roomId=${selectedRoom.id}`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to room:", selectedRoom.id);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [selectedRoom]);

  const sendMessage = (msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  };

  return { messages, sendMessage };
};

export default useRoomSocket;
