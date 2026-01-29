import { useState } from "react";
import useRoomSocket from "../hooks/useRoomSocket";

const ChatArea = () => {
  const { messages, sendMessage } = useRoomSocket();
  const [input, setInput] = useState("");

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
            setInput("");
          }
        }}
      />
    </div>
  );
};
export default ChatArea;
