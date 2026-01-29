import { axiosInstance } from "../config/axiosInstance";

const leaveRoom = async (roomId: string) => {
  const response = await axiosInstance.post(`/api/v1/rooms/leave/${roomId}`);
  return response.data;
};

export default leaveRoom;
