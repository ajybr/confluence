import InviteIcon from "../utils/InviteIcon";
import useRoomStore from "../store/useRoomStore";
import { useModal } from "../contexts/ModalContext";

interface InviteButtonProps {
  className?: string;
}

const InviteButton = ({ className = "" }: InviteButtonProps) => {
  const selectedRoom = useRoomStore((state) => state.selectedRoom);
  const { openInviteModal } = useModal();

  const handleInviteClick = () => {
    if (selectedRoom) {
      openInviteModal({
        roomId: selectedRoom.id,
        roomName: selectedRoom.roomName,
        roomCode: selectedRoom.roomCode,
      });
    }
  };

  return (
    <div 
      className={`group flex items-center space-x-2 cursor-pointer ${className}`}
      onClick={handleInviteClick}
    >
      <span className="opacity-0 group-hover:opacity-70 text-white transition text-sm">
        Invite
      </span>
      <InviteIcon />
    </div>
  );
};

export default InviteButton;