import axios from "axios";
import useToastStore from "../store/toastStore";
import useUserStore from "../store/useUserStore";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status && status >= 500) {
      const errMes = error?.response?.data?.errMes ?? "Something went wrong.";
      useToastStore.getState().showToast(errMes, "error");
    }
    return Promise.reject(error);
  },
);
