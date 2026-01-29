import { axiosInstance } from "../config/axiosInstance";

interface AuthPayload {
  username: string;
  password: string;
  bio?: string;
  mode: "signin" | "signup";
}

const authenticateUser = async ({
  username,
  password,
  bio,
  mode,
}: AuthPayload) => {
  const url = `/api/v1/users/${mode}`;
  const payload =
    mode === "signin" ? { username, password } : { username, password, bio };

  const response = await axiosInstance.post(url, payload);
  return response.data;
};
export default authenticateUser;
