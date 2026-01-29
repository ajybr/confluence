import axios from "axios";
import useToastStore from "../store/toastStore";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errMes = error?.response?.data?.errMes ?? "Something went wrong.";
    useToastStore.getState().showToast(errMes, "error");
    return Promise.reject(error);
  },
);
