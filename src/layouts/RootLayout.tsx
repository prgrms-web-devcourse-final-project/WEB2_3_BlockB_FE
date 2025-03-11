import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import TopButton from "../components/common/TopButton";

const RootLayout = () => {
  const [headerStatus, setHeaderStatus] = useState<HeaderStatusType>("default");
  const [footerStatus, setFooterStatus] = useState<FooterStatusType>("default");
  const { pathname } = useLocation();
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  useEffect(() => {
    // 존재하는 유효한 경로 목록 (App.tsx에서 설정한 경로)
    const validRoutes = [
      "/",
      "/main",
      "/news",
      "/news/:newsId",
      "/debate-rooms",
      "/debaters",
      "/admin",
      "/user-page/:userId",
      "/profile-update",
      "/debate-zone",
      "/observing-zone",
      "/login",
      "/signup/:userId",
      "/oauth/callback",
    ];

    // 특정 페이지에서는 헤더 & 푸터 숨기기
    const noHeaderFooterPages = [
      "/debate-zone",
      "/observing-zone",
      "/login",
      "/signup",
      "/oauth/callback",
    ];

    // 현재 pathname이 존재하는 경로인지 확인
    const isValidRoute = validRoutes.some((route) =>
      new RegExp(`^${route.replace(/:\w+/g, "[^/]+")}$`).test(pathname)
    );

    // 404 페이지 여부 감지
    const isNotFoundPage = !isValidRoute;

    if (
      noHeaderFooterPages.some((path) => pathname.startsWith(path)) ||
      isNotFoundPage
    ) {
      setHideHeaderFooter(true);
    } else {
      setHideHeaderFooter(false);
    }

    // 페이지별 헤더/푸터 스타일 설정
    if (pathname === "/") {
      setFooterStatus("landing");
    } else {
      setHeaderStatus("default");
      setFooterStatus("default");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen ">
      {!hideHeaderFooter && <Header status={headerStatus} />}
      <main className="flex-1 ">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer status={footerStatus} />}
      <TopButton />
    </div>
  );
};

export default RootLayout;
