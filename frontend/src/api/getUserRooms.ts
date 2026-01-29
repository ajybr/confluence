import { axiosInstance } from "../config/axiosInstance";

const getUserRooms = async () => {
  const response = await axiosInstance.get(`/api/v1/rooms/myrooms`);
  return response.data;
};

export default getUserRooms;
