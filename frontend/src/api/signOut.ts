import { axiosInstance } from "../config/axiosInstance";

const signOut = async () => {
  const response = await axiosInstance.post("/api/v1/users/signout");
  return response.data;
};
export default signOut;
