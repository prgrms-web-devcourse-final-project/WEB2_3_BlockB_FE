import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      setAccessToken(accessToken);
      console.log("로그인 성공");
      navigate("/signup", { replace: true });
    } else {
      console.error("Access token이 존재하지 않습니다.");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, setAccessToken]);

  return <div>로그인중</div>;
}
