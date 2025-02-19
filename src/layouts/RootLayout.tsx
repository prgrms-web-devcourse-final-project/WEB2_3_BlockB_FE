import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [headerStatus, setHeaderStatus] = useState<HeaderStatusType>("default");
  const [footerStatus, setFooterStatus] = useState<FooterStatusType>("default");
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      setHeaderStatus("landing");
      setFooterStatus("landing");
    } else {
      setHeaderStatus("default");
      setFooterStatus("default");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header status={headerStatus} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer status={footerStatus} />
    </div>
  );
};

export default RootLayout;
