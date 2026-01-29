import { axiosInstance } from "../config/axiosInstance";

const getWsToken = async () => {
  const response = await axiosInstance.get("/api/v1/ws-token");
  return response.data.token;
};

export default getWsToken;
