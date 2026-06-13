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
        if (!error.response || error.response.status >= 500) return;
        const errorMsg = error.response?.data?.errMes ?? "Sorry, our servers are down. Please try again later.";
        showToast(errorMsg, "error");
      } else {
        showToast("Sorry, our servers are down. Please try again later.", "error");
      }
    },
  });
};

export default useCreateRoom;
