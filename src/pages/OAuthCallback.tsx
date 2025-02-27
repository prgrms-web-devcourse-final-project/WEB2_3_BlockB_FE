import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      console.log("로그인 성공");
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      navigate("/signup", { replace: true });
    } else {
      console.error("Access token이 존재하지 않습니다.");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, setAccessToken]);
  return <div>로그인중</div>;
}
