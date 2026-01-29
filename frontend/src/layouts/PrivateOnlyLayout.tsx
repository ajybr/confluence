import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../store/useUserStore";

export default function PrivateOnlyLayout() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
