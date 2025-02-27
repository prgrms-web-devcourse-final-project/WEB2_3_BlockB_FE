import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { userApi } from "../api/user";

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const { setUser } = useUserStore();

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
      userApi
        .fetchMyProfile()
        .then((res) => {
          const userData = res.data;
          setUser({
            userId: userData.id,
            nickname: userData.nickname,
            profileUrl: userData.profileUrl,
            role: userData.role,
          });
          navigate("/main", { replace: true });
        })
        .catch((err) => {
          console.error(err);
          navigate("/login", { replace: true });
        });
    } else {
      console.error("Access token이 존재하지 않습니다.");
      navigate("/login", { replace: true });
    }
  }, [location, navigate, setAccessToken, setRefreshToken, setUser]);
  return <div>로그인중</div>;
}
