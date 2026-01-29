import { axiosInstance } from "../config/axiosInstance";
import { CreateMessagePayload } from "../hooks/useCreateMessage";

const createMessage = async (payload: CreateMessagePayload) => {
  const response = await axiosInstance.post(
    `api/v1/messages/createNewMessage/${payload.roomId}`,
    payload,
  );
  return response.data;
};

export default createMessage;
