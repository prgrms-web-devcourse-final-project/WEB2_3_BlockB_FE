import "./css/index.css";
import { Route, Routes } from "react-router";
import useTokenRefresh from "./hooks/useTokenRefresh";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import GeneratingRoom from "./pages/GeneratingRoom";
import AdminRoute from "./layouts/AdminRoute";

function App() {
  useTokenRefresh();

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<RootLayout />}>
          {/* 로그인하지 않은 상태에서만 접근 가능 */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/login/oauth2/callback/google"
              element={<OAuthCallback />}
            />
            <Route
              path="/login/oauth2/callback/kakao"
              element={<OAuthCallback />}
            />
          </Route>
          <Route path="/signup/:userId" element={<Signup />} />

          {/* 로그인한 사용자만 접근 가능 */}
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<Main />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<NewsDetail />} />
            <Route path="/debate-rooms" element={<DebateRooms />} />
            <Route path="/debaters" element={<Debaters />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/user-page/:userId" element={<UserPage />} />
            <Route
              path="/debate-zone/new-debate"
              element={<GeneratingRoom />}
            />
            <Route path="/debate-zone/:roomId" element={<DebateZone />} />
            <Route path="/observing-zone/:roomId" element={<ObservingZone />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/not-found" element={<NotFound />} />
      </Route>
      </Routes>
      ;
    </QueryClientProvider>
  );
}

export default App;
