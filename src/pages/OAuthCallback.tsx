import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();
  const { setUser } = useUserStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (!code) {
      console.error("인가 코드가 존재하지 않습니다.");
      navigate("/", { replace: true });
      return;
    }

    console.log("인가 코드:", code);

    let provider = "";
    if (location.pathname.includes("google")) provider = "google";
    else if (location.pathname.includes("kakao")) provider = "kakao";
    else if (location.pathname.includes("naver")) provider = "naver";

    if (!provider) {
      navigate("/", { replace: true });
      return;
    }

    const apiUrl = `${VITE_BACKEND_URL}/login/oauth2/callback?code=${encodeURIComponent(
      code
    )}&provider=${provider}`;

    axios
      .post(apiUrl, null, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(async (res) => {
        console.log("로그인 성공", res.data);

        const { accessToken, refreshToken, nickname, imgUrl, userId, role } =
          res.data.data;

        if (!userId) {
          navigate("/", { replace: true });
          return;
        }

        const isAutoGeneratedNickname = /^(GOOGLE|KAKAO|NAVER)_.+$/.test(
          nickname.trim()
        );

        setTokens(accessToken, refreshToken, isAutoGeneratedNickname);
        setUser({ userId, nickname, profileUrl: imgUrl, role });

        if (isAutoGeneratedNickname) {
          navigate(`/signup/${userId}`, { replace: true });
        } else {
          navigate("/main", { replace: true });
        }
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        if (err.response) {
          console.error("서버 응답 데이터:", err.response.data);
          console.error("서버 응답 코드:", err.response.status);
        }
        navigate("/", { replace: true });
      });
  }, [location.search]);

  return <div>로그인 중...</div>; //로딩 스피너로 변경할 예정
}
