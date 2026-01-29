import { axiosInstance } from "../config/axiosInstance";

export interface createRoomPayload {
  roomName: string;
  description?: string;
}

const createRoom = async (data: createRoomPayload) => {
  const response = await axiosInstance.post(`/api/v1/rooms/create`, data);
  return response.data;
};

export default createRoom;
