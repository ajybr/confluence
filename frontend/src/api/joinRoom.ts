import { axiosInstance } from "../config/axiosInstance";

const joinRoom = async (roomId: string) => {
  const response = await axiosInstance.post(`/api/v1/rooms/join/${roomId}`);
  return response.data;
};
export default joinRoom;
