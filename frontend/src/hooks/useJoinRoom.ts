import { useMutation, useQueryClient } from "@tanstack/react-query";
import joinRoom from "../api/joinRoom";
import useToast from "./useToast";

const useJoinRoom = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (roomId: string) => joinRoom(roomId),
    onSuccess: (data) => {
      console.log(data);
      queryClient.refetchQueries({ queryKey: ["userRooms"] });
      showToast(`Joined Room ${data.room} Successfully!`, "success");
    },
  });
};

export default useJoinRoom;
