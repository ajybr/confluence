import { useState } from "react";
import useRoomStore from "../store/useRoomStore";
import InviteIcon from "../utils/InviteIcon";
import LeaveRoomIcon from "../utils/LeaveRoomIcon";
import MenuIcon from "../utils/MenuIcon";
import useLeaveRoom from "../hooks/useLeaveRoom";

const Topbar = () => {
  const selectedRoom = useRoomStore((state) => state.selectedRoom);
  const [menuOpen, setMenuOpen] = useState(false);
  const leaveRoomMutation = useLeaveRoom();

  const leaveRoomHandler = () => {
    if (!selectedRoom) return;
    leaveRoomMutation.mutate(selectedRoom.id);
  };

  return (
    <div className="px-6 z-30 py-3 md:px-8 md:py-4 bg-[#111928]/50 border-[#ffffff20] border-b-1 backdrop-blur-lg backdrop-saturate-180 backdrop-contrast-125 bg-blend-overlay flex justify-between items-center">
      <div className="text-white flex items-center">
        <div className="md:text-lg text-sm border-l-white/70 border-l pl-2">
          {selectedRoom ? (
            selectedRoom.roomName
          ) : (
            <div className="text-white/40">
              {" "}
              Select a room to start messaging{" "}
            </div>
          )}
        </div>
      </div>

      {selectedRoom ? (
        <div className="flex items-center space-x-2">
          <div className="group flex items-center space-x-2 cursor-pointer">
            <span className="opacity-0 group-hover:opacity-70 text-white transition text-sm">
              Invite
            </span>
            <InviteIcon />
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white bg-white/0 cursor-pointer p-1 rounded-full shadow-lg hover:bg-white/30"
            >
              <MenuIcon />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-fit text-nowrap bg-white rounded-md shadow-lg z-50 overflow-hidden">
                <button
                  onClick={leaveRoomHandler}
                  className="w-fit font-nebula-medium font-bold text-red-500 m-1 hover:bg-red-200 text-xs px-4 rounded-[inherit] py-2 flex items-center"
                >
                  <LeaveRoomIcon />
                  Leave Room
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Topbar;
