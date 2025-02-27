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
    // 특정 페이지에서는 헤더 & 푸터 숨기기
    const noHeaderFooterPages = ["/debate-zone", "/observing-zone", "/login"];

    if (noHeaderFooterPages.some((path) => pathname.startsWith(path))) {
      setHideHeaderFooter(true);
    } else {
      setHideHeaderFooter(false);
    }

    // 페이지별 헤더/푸터 스타일 설정
    if (pathname === "/") {
      setHeaderStatus("landing");
      setFooterStatus("landing");
      // } else if (["/login", "/signup", "/oauth/callback"].includes(pathname)) {
      //   setHeaderStatus("auth");
      //   setFooterStatus("auth");
    } else {
      setHeaderStatus("default");
      setFooterStatus("default");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header status={headerStatus} />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer status={footerStatus} />}
      <TopButton />
    </div>
  );
};

export default RootLayout;
