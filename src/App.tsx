import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import News from "./pages/News";
import DebateRooms from "./pages/DebateRooms";
import MyPage from "./pages/MyPage";
import RootLayout from "./layouts/RootLayout";
import Debaters from "./pages/Debaters";
import "./css/index.css";
function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/debate-rooms" element={<DebateRooms />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/debaters" element={<Debaters />} />
        </Route>
        {/* 헤더 내 분류 */}
      </Routes>
    </>
  );
}

export default App;
