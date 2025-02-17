import { Outlet } from "react-router";
import Header from "../components/common/Header";

export default function () {
  return (
    <div>
      <Header status="default" />
      <Outlet />
    </div>
  );
}
