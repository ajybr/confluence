import { useState } from "react";
import useToast from "../hooks/useToast";
import useJoinRoom from "../hooks/useJoinRoom";

const JoinRoomModal = () => {
  const [roomCode, setRoomCode] = useState("");
  const { showToast } = useToast();
  const joinRoomMutation = useJoinRoom();

  const handleJoin = () => {
    joinRoomMutation.mutate(roomCode);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        className="w-full pr-24 pl-3 py-3 rounded-sm border-1 border- font-bold text-[#e9e6e1] bg-transparent"
        type="text"
        value={roomCode}
        onChange={(e) => {
          const roomCodeLength = 25;
          if (e.target.value.length <= roomCodeLength) {
            setRoomCode(e.target.value);
          } else {
            showToast(
              `Room Codes cannot be longer than ${roomCodeLength}`,
              "error",
            );
          }
        }}
        placeholder="Room Code"
      />
      <button
        onClick={handleJoin}
        className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-br from-[#977DFF] to-[#F2E6EE] text-black font-semibold transition-all duration-350 rounded-sm hover:rounded-none cursor-pointer hover:bg-[#977DFF]/70"
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoomModal;
