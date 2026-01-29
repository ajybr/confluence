import { useQuery } from "@tanstack/react-query";
import checkHealth from "../api/checkApiHealth";

export const useCheckHealth = () => {
  return useQuery({
    queryKey: ["health"],
    queryFn: checkHealth,
  });
};
