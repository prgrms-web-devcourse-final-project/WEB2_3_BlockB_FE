import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
