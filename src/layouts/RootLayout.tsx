import Header from "../components/common/Header";
import { Outlet } from "react-router";

export default function () {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
