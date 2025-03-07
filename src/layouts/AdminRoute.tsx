import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useAuthStore } from "../stores/authStore";

const AdminRoute = () => {
  const { role } = useUserStore();
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/main" replace />;
};

export default AdminRoute;
