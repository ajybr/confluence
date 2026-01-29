import { useQuery } from "@tanstack/react-query";
import getUserRooms from "../api/getUserRooms";

const useGetUserRooms = () => {
  return useQuery({
    queryKey: ["userRooms"],
    queryFn: getUserRooms,
  });
};

export default useGetUserRooms;
