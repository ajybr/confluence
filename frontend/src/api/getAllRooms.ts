import { axiosInstance } from "../config/axiosInstance";

const getAllRooms = async () => {
  const response = await axiosInstance.get(`/api/v1/rooms/all`);
  return response.data;
};

export default getAllRooms;
