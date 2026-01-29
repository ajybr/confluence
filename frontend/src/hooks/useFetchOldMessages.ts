import { useQuery } from "@tanstack/react-query";
import fetchOldMessages from "../api/fetchOldMessages";

const useFetchOldMessages = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ["roomMessages", roomId],
    queryFn: () => fetchOldMessages(roomId),
    enabled: !!roomId,
  });
};

export default useFetchOldMessages;
