import { create } from "zustand";
import { DatabaseMessage, SocketMessage } from "../types/messages";

type Message = DatabaseMessage | SocketMessage;

type MessageState = {
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  clearMessage: () => void;
};

const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessage: () => set({ messages: [] }),
}));

export default useMessageStore;
