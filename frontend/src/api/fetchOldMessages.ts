import { axiosInstance } from "../config/axiosInstance";

const fetchOldMessages = async (roomId: string | undefined) => {
  const response = await axiosInstance.get(
    `/api/v1/messages/fetchOldMessages/${roomId}`,
  );
  return response.data;
};

export default fetchOldMessages;
