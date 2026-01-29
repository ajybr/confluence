import { useMutation } from "@tanstack/react-query";
import signOut from "../api/signOut";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useSignOut = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      showToast("Logged Out Successfully!", "success");
      setTimeout(() => {
        navigate("/signin");
      }, 0);
    },
  });
};
export default useSignOut;
