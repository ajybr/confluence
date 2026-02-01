import { useMutation } from "@tanstack/react-query";
import createMessage from "../api/createMessage";
import useToast from "./useToast";

const useCreateMessage = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: createMessage,
    onError: () => {
      showToast("Failed to Send Message", "error");
    },
  });
};

export default useCreateMessage;
