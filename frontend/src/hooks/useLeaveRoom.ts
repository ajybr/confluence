import { useMutation, useQueryClient } from "@tanstack/react-query";
import leaveRoom from "../api/leaveRoom";
import useMessageStore from "../store/useMessageStore";
import useRoomStore from "../store/useRoomStore";
import useToast from "./useToast";

const useLeaveRoom = () => {
  const { showToast } = useToast();
  const clearMessages = useMessageStore((s) => s.clearMessage);
  const clearRoom = useRoomStore((s) => s.clearSelectedRoom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRooms"] });
      clearRoom();
      clearMessages();
      showToast("Left the room successfully", "success");
    },
    onError: () => {
      showToast("Failed to leave the room", "error");
    },
  });
};

export default useLeaveRoom;
