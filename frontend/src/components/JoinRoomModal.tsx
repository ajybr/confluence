import { useState } from "react";
import useToast from "../hooks/useToast";
import useJoinRoom from "../hooks/useJoinRoom";
import Button from "./ui/Button";
import FormInput from "./ui/FormInput";
import BaseModal from "./ui/BaseModal";
import LinkIcon from "../utils/LinkIcon";

interface JoinRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinRoomModal = ({ isOpen, onClose }: JoinRoomModalProps) => {
  const [roomInput, setRoomInput] = useState("");
  const [isLinkDetected, setIsLinkDetected] = useState(false);
  const { showToast } = useToast();
  const joinRoomMutation = useJoinRoom();

  const parseRoomInput = (input: string): string => {
    const trimmedInput = input.trim();
    const joinPattern = /\/join\/([^/?#]+)/;
    const match = trimmedInput.match(joinPattern);

    return match ? match[1] : trimmedInput;
  };

  const detectLink = (input: string): boolean => {
    return input.includes("/join/") && input.startsWith("http");
  };

  const handleInputChange = (value: string) => {
    setRoomInput(value);
    setIsLinkDetected(detectLink(value));
  };

  const handleJoin = () => {
    const parsedCode = parseRoomInput(roomInput);

    if (!parsedCode) {
      showToast("Valid room code or link is required", "error");
      return;
    }

    joinRoomMutation.mutate(parsedCode, {
      onSuccess: () => {
        onClose();
        setRoomInput("");
        setIsLinkDetected(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleJoin();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Join Room">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Room Code or Link"
          value={roomInput}
          onChange={handleInputChange}
          placeholder="Room code or invite link"
          required
          disabled={joinRoomMutation.isPending}
        />

        {isLinkDetected && (
          <div className="flex items-center gap-2 text-sm text-green-400">
            <LinkIcon />
            <span>Link detected - room code extracted</span>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={joinRoomMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            disabled={joinRoomMutation.isPending}
            loading={joinRoomMutation.isPending}
            fullWidth
          >
            {joinRoomMutation.isPending ? "Joining..." : "Join"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default JoinRoomModal;
