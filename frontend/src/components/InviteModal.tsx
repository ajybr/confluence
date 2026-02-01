import { useRef, useEffect } from "react";
import useToast from "../hooks/useToast";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { generateInviteUrl } from "../utils/generateInviteUrl";
import BaseModal from "./ui/BaseModal";
import Button from "./ui/Button";
import FormInput from "./ui/FormInput";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  roomName: string;
  roomCode?: string;
}

const InviteModal = ({ isOpen, onClose, roomId, roomName, roomCode }: InviteModalProps) => {
  const { showToast } = useToast();
  const { copy, copied } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);

  const inviteUrl = generateInviteUrl(roomId);
  const shareUrl = roomCode ? `${window.location.origin}/join/${roomCode}` : inviteUrl;

  const handleCopyLink = async () => {
    const success = await copy(shareUrl);
    if (success) {
      showToast("Invite link copied to clipboard!", "success");
    } else {
      showToast("Failed to copy invite link", "error");
    }
  };

  const handleCopyRoomCode = async () => {
    if (!roomCode) return;
    const success = await copy(roomCode);
    if (success) {
      showToast("Room code copied to clipboard!", "success");
    } else {
      showToast("Failed to copy room code", "error");
    }
  };

  const handleCopyRoomId = async () => {
    const success = await copy(roomId);
    if (success) {
      showToast("Room ID copied to clipboard!", "success");
    } else {
      showToast("Failed to copy room ID", "error");
    }
  };

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={`Invite to ${roomName}`}>
      <div className="space-y-4">
        <FormInput
          ref={inputRef}
          label="Invite Link"
          value={shareUrl}
          readOnly
          rightElement={
            <Button variant="gradient" onClick={handleCopyLink} className="px-3 text-sm">
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          }
        />
        
        {roomCode && (
          <FormInput
            label="Room Code"
            value={roomCode}
            readOnly
            rightElement={
              <Button variant="gradient" onClick={handleCopyRoomCode} className="px-3 text-sm">
                Copy
              </Button>
            }
          />
        )}
        
        <FormInput
          label="Room ID"
          value={roomId}
          readOnly
          rightElement={
            <Button variant="gradient" onClick={handleCopyRoomId} className="px-3 text-sm">
              Copy
            </Button>
          }
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </BaseModal>
  );
};

export default InviteModal;
