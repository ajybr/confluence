import { useEffect } from "react";
import useUserStore from "../store/useUserStore";

const SessionLoader = ({ children }: { children: React.ReactNode }) => {
  const loading = useUserStore((state) => state.loading);
  const getUser = useUserStore((state) => state.getUser);
  useEffect(() => {
    getUser();
  }, [getUser]);
  if (loading) return null;
  return <>{children}</>;
};
export default SessionLoader;
