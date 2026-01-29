import { useMutation } from "@tanstack/react-query";
import authenticateUser from "../api/authenticateUser";

const useAuthMutation = () => {
  return useMutation({
    mutationFn: authenticateUser,
  });
};

export default useAuthMutation;
