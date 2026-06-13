import { useMutation } from "@tanstack/react-query";
import createMessage from "../api/createMessage";
import useToast from "./useToast";
import axios from "axios";

const useCreateMessage = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createMessage,
    onError: (error) => {
      if (axios.isAxiosError(error) && (!error.response || error.response.status >= 500)) return;
      showToast("Failed to Send Message", "error");
    },
  });
};

export default useCreateMessage;
