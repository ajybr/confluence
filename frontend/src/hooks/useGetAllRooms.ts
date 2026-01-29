import { useQuery } from "@tanstack/react-query";
import getAllRooms from "../api/getAllRooms";

const useGetAllRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
  });
};

export default useGetAllRooms;
