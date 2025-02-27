import "./css/index.css";

import { Route, Routes } from "react-router";

import Admin from "./pages/Admin";
import DebateRooms from "./pages/DebateRooms";
import DebateZone from "./pages/DebateZone";
import Debaters from "./pages/Debaters";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import UserPage from "./pages/UserPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import ObservingZone from "./pages/ObservingZone";
import ProfileUpdate from "./components/user-page/ProfileUpdate";
import RootLayout from "./layouts/RootLayout";
import Signup from "./pages/Signup";
import OAuthCallback from "./pages/OAuthCallback";

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
          <Route path="/user-page/:userId" element={<UserPage />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
        </Route>
        <Route path="/debate-zone/:debateId" element={<DebateZone />} />
        <Route path="/observing-zone/:debateId" element={<ObservingZone />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        {/* 헤더 내 분류 */}
        <Route path="/debate-zone" element={<DebateZone />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
