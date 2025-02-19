import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header status="landing" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer status="landing" />
    </div>
  );
};

export default RootLayout;
