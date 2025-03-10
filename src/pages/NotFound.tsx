import { Link, useNavigate } from "react-router-dom";

import notFound from "../assets/images/404.png";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/main"); // 30초 후 메인으로 이동
    }, 30000);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${notFound})` }}
    >
      <h1 className="text-[100px]  font-unifrakturCook text-white">404</h1>
      <p className="mt-2 font-extrabold font-pretendard text-white text-[24px] mb-[32px]">
        잘못된 경로로 들어왔습니다
      </p>
      <Link
        to="/news"
        className="text-white font-extrabold text-[16px] font-pretendard"
      >
        웹사이트로 돌아가서
        <span className="border-b"> 뉴스를 확인해보세요</span>
      </Link>
    </div>
  );
}
