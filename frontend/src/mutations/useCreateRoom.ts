import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../hooks/useToast";
import createRoom, { createRoomPayload } from "../api/createRoom";
import axios from "axios";

const useCreateRoom = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: createRoomPayload) => createRoom(payload),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["userRooms"] });
      showToast(`Room ${data.roomName} created successfully!`, "success");
      //todo: open room automatically and open invite friends dialog
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.errMes ?? "Unknown error";
        showToast(errorMsg, "error");
      } else {
        showToast("Unexpected error", "error");
      }
    },
  });
};

export default useCreateRoom;
