import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import useAutoJoinRoom from "../hooks/useAutoJoinRoom";

const JoinRoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isJoining, setIsJoining] = useState(false);
  const { autoJoinRoom, error, isPending } = useAutoJoinRoom();

  useEffect(() => {
    if (!roomId) {
      showToast("Invalid invite link", "error");
      navigate("/me");
      return;
    }

    setIsJoining(true);
    autoJoinRoom(roomId, {
      onSuccess: (room) => {
        setIsJoining(false);
        const roomObj = room as { roomName?: string; id?: string };
        showToast(`Successfully joined ${roomObj.roomName || "room"}!`, "success");
        navigate("/me", { state: { roomToSelect: roomObj } });
      },
      onError: (errorMessage) => {
        setIsJoining(false);
        showToast(errorMessage, "error");
        setTimeout(() => {
          navigate("/me");
        }, 2000);
      }
    });
  }, [roomId, navigate, showToast, autoJoinRoom]);

  if (isJoining || isPending) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-white mx-auto"></div>
          <p className="text-white text-lg font-nebula-light">
            Joining room...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] flex items-center justify-center z-50">
        <div className="text-center space-y-6 p-8 bg-[#1a1a1a]/80 backdrop-blur-lg rounded-xl max-w-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-nebula-light font-bold text-white">
              Join Failed
            </h2>
            <p className="text-white/80 font-nebula-book">
              {error}
            </p>
          </div>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full px-4 py-3 bg-gradient-to-br from-[#977DFF] to-[#F2E6EE] text-black font-semibold rounded-lg hover:rounded-none transition-all duration-350 cursor-pointer"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => navigate("/me")}
              className="w-full px-4 py-3 bg-[#2d1c7f] text-white font-semibold rounded-lg hover:bg-[#3a2a9a] transition-all duration-400 cursor-pointer"
            >
              Go to Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <p className="text-white/60 text-sm">
          Setting up your room...
        </p>
      </div>
    </div>
  );
};

export default JoinRoomPage;