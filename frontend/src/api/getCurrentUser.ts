import { axiosInstance } from "../config/axiosInstance";

const getCurrentUser = async () => {
  const response = await axiosInstance.get("/api/v1/users/me");
  if (response.status === 401) return null;
  return response.data;
};

export default getCurrentUser;
