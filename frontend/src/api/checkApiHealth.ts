import { axiosInstance } from "../config/axiosInstance";

const checkHealth = async () => {
  const response = await axiosInstance.get(`/api/health`);
  return response.data;
};

export default checkHealth;
