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

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/debate-rooms" element={<DebateRooms />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/debaters" element={<Debaters />} />
        </Route>
        <Route path="/debate-zone/:debateId" element={<DebateZone />} />
        <Route path="/observing-zone/:debateId" element={<ObservingZone />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
