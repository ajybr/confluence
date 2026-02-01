import { useEffect, useRef, useState } from "react";
import useToast from "../hooks/useToast";
import useCreateRoom from "../mutations/useCreateRoom";
import BaseModal from "./ui/BaseModal";
import Button from "./ui/Button";
import FormInput from "./ui/FormInput";
import FormTextArea from "./ui/FormTextArea";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomModal = ({ isOpen, onClose }: CreateRoomModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();
  const createRoomMutation = useCreateRoom();
  const roomNameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      showToast("Room Name is required!", "error");
      return;
    }
    createRoomMutation.mutate(
      { roomName, description: description.trim() || undefined },
      { onSuccess: onClose },
    );
  };

  useEffect(() => {
    roomNameRef.current?.focus();
  }, []);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create New Room">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          ref={roomNameRef}
          label="Room Name"
          value={roomName}
          onChange={setRoomName}
          placeholder="Room Name"
          required
          disabled={createRoomMutation.isPending}
        />

        <FormTextArea
          label="Description (optional)"
          value={description}
          onChange={setDescription}
          placeholder="Describe your room..."
          rows={3}
          disabled={createRoomMutation.isPending}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={createRoomMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={createRoomMutation.isPending}
            loading={createRoomMutation.isPending}
            fullWidth
          >
            {createRoomMutation.isPending ? "Creating..." : "Create Room"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreateRoomModal;
