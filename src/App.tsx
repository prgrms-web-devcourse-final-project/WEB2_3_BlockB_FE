import "./css/index.css";

import { Route, Routes } from "react-router";

import RootLayout from "./layouts/RootLayout";
import DebateRooms from "./pages/DebateRooms";
import DebateZone from "./pages/DebateZone";
import Debaters from "./pages/Debaters";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/debate-rooms" element={<DebateRooms />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/debaters" element={<Debaters />} />
        </Route>
        <Route path="/debate-zone" element={<DebateZone />} />

        {/* 헤더 내 분류 */}
      </Routes>
    </>
  );
}

export default App;
