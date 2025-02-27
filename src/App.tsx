import "./css/index.css";
import { Route, Routes } from "react-router";

import Admin from "./pages/Admin";
import DebateRooms from "./pages/DebateRooms";
import DebateZone from "./pages/DebateZone";
import Debaters from "./pages/Debaters";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import ObservingZone from "./pages/ObservingZone";
import ProfileUpdate from "./components/my-page/ProfileUpdate";
import RootLayout from "./layouts/RootLayout";
import Signup from "./pages/Signup";
import OAuthCallback from "./pages/OAuthCallback";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* 로그인하지 않은 상태에서만 접근 가능 */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
        </Route>

        {/* 로그인한 사용자만 접근 가능 */}
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsId" element={<NewsDetail />} />
          <Route path="/debate-rooms" element={<DebateRooms />} />
          <Route path="/debaters" element={<Debaters />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="/debate-zone/:debateId" element={<DebateZone />} />
          <Route path="/observing-zone/:debateId" element={<ObservingZone />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
