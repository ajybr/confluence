import { useMutation, useQueryClient } from "@tanstack/react-query";
import leaveRoom from "../api/leaveRoom";
import useMessageStore from "../store/useMessageStore";
import useRoomStore from "../store/useRoomStore";
import useToast from "./useToast";
import axios from "axios";

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
    onError: (error) => {
      if (axios.isAxiosError(error) && (!error.response || error.response.status >= 500)) return;
      showToast("Failed to leave the room", "error");
    },
  });
};

export default useLeaveRoom;
