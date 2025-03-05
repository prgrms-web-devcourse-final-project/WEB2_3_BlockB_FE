import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isNewUser = useAuthStore((state) => state.isNewUser);
  const userId = useUserStore((state) => state.userId);

  if (accessToken) {
    if (isNewUser && userId) {
      return <Navigate to={`/signup/${userId}`} replace />;
    }
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
