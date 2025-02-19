import "./css/index.css";

import { Route, Routes } from "react-router";

import DebateRooms from "./pages/DebateRooms";
import DebateZone from "./pages/DebateZone";
import Debaters from "./pages/Debaters";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ObservingZone from "./pages/ObservingZone";
import ProfileUpdate from "./components/my-page/ProfileUpdate";
import RootLayout from "./layouts/RootLayout";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/debate-rooms" element={<DebateRooms />} />
          <Route path="/debaters" element={<Debaters />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
        </Route>
        <Route path="/debate-zone/:debateId" element={<DebateZone />} />
        <Route path="/observing-zone/:debateId" element={<ObservingZone />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/login" element={<Login />} />
        {/* 헤더 내 분류 */}
        <Route path="/debate-zone" element={<DebateZone />} />
      </Routes>
    </>
  );
}

export default App;
