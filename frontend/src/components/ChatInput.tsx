import { ChangeEvent, useRef, useState } from "react";
import SendIcon from "../utils/SendIcon";
import AttachmentsIcon from "../utils/AttachmentsIcon";
import { sendMessage } from "../config/socket";
import useRoomStore from "../store/useRoomStore";
import useCreateMessage from "../hooks/useCreateMessage";
import useToast from "../hooks/useToast";
import useUserStore from "../store/useUserStore";
import { BaseMessage } from "../types/messages";

export default function ChatInput() {
  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");
  const createMessageMutation = useCreateMessage();
  const selectedRoom = useRoomStore((state) => state.selectedRoom);
  const { showToast } = useToast();
  const user = useUserStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const content = message.trim();
    if (!content || !selectedRoom?.id || !user) {
      if (!user) showToast("User not found!", "error");
      return;
    }

    const socketMessage: BaseMessage = {
      id: `${Date.now()}-${Math.random()}`,
      sender: {
        id: user.id,
        username: user.username,
      },
      content: content,
      timestamp: new Date().toISOString(),
      mediaUrl: null,
      replyToId: null,
    };

    sendMessage(socketMessage);
    createMessageMutation.mutate(
      {
        roomId: selectedRoom?.id,
        content: content,
      },
      {
        onSuccess: () => {
          setMessage("");
        },
      },
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
    }
  };

  return (
    <div className="w-full mb-22 px-4 py-2 bg-transparent">
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`flex items-center backdrop-blur-md backdrop-saturate-150 outline-white/50 bg-slate-500/40 transition-all duration-300 rounded-full px-4 py-2 ${
          focused ? "w-3/5" : "w-1/3"
        } mx-auto`}
      >
        {focused && (
          <button
            onMouseDown={() => {
              fileInputRef.current?.click();
            }}
            className="mr-2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
          >
            <AttachmentsIcon />
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          className="flex-grow bg-transparent text-wrap text-white placeholder-white/60 outline-none"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="ml-2 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
