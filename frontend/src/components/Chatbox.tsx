import useRoomStore from "../store/useRoomStore";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Topbar from "./Topbar";

const Chatbox = () => {
  const selectedRoom = useRoomStore((state) => state.selectedRoom);
  return (
    <div className="col-span-9 md:col-span-10 min-h-full relative min-w-full bg-gradient-to-r from-[#4136c3] via-[#FBC7D4] to-[#9796F0] opacity-90 rounded-tl-3xl overflow-hidden flex flex-col animate-gradient">
      {/* animate-gradient */}
      {/* Glass Background Overlay */}
      <div className="absolute inset-0 bg-slate-800/60 min-h-full min-w-full -z-10 backdrop-blur-xl backdrop-saturate-150 backdrop-contrast-120 bg-blend-overlay rounded-tl-4xl" />

      <Topbar />

      <div className="grow z-10 px-20 p-1 space-y-2 overflow-y-auto">
        <MessageList />
      </div>

      {selectedRoom && <ChatInput />}
    </div>
  );
};

export default Chatbox;
