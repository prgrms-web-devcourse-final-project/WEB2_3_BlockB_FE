import { useEffect, useState } from "react";
import { Link } from "react-router";
import logoWhite from "../../assets/icons/logo-white-big.svg";
import logo from "../../assets/icons/logo.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notification from "../../assets/icons/notification.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profile from "../../assets/icons/profile.svg";
import NotificationList from "../notification/NotificationList";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import Modal from "./Modal";
import useGetNotifications from "../../hooks/useGetNotifications";
import { Client, Frame, IMessage } from "@stomp/stompjs";
import { useAuthStore } from "../../stores/authStore";

// TODO: 삼항 연산자 기준으로 함수 나누기 (파일 내에서)

export default function Header({ status }: { status: HeaderStatusType }) {
  // 'debate-ing' 상태일 때 헤더를 렌더링하지 않음
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { userId, profileUrl, role } = useUserStore();
  const { accessToken } = useAuthStore.getState();
  const { data, refetch } = useGetNotifications(userId!);

  if (status === "debate-ing") {
    return null;
  }

  useEffect(() => {
    const WS_URL = import.meta.env.VITE_WS_URL;
    const tempId = crypto.randomUUID(); // handshake용 임시 ID

    const client = new Client({
      brokerURL: `${WS_URL}/notification`,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000,
    });

    client.onConnect = (frame: Frame) => {
      console.log("STOMP 웹소켓 연결 성공:", frame);

      // 1. 서버로 handshake용 메시지 전송
      client.subscribe(`/queue/handshake-${tempId}`, (msg) => {
        const mySessionId = msg.body;
        console.log("세션 ID 수신:", mySessionId);

        // 2. 세션 ID 기반으로 알림 채널 구독
        client.subscribe(
          `/queue/notification-${mySessionId}`,
          (message: IMessage) => {
            try {
              console.log("알림 수신:", message.body);

              const parsedData = JSON.parse(message.body);
              console.log("파싱된 알림 데이터:", parsedData);

              // 여기서 알림 상태 업데이트 등 처리
              refetch();
            } catch (error) {
              console.error("웹소켓 데이터 파싱 실패:", error);
            }
          }
        );
      });

      // 3. 서버에 handshake 등록 요청 전송
      if (client.connected) {
        client.publish({
          destination: "/app/noti",
          body: tempId,
        });
      }
      console.log("웹소켓 메시지 전송 완료!");
    };
    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Modal />
        {status === "landing" ? (
          <div className="w-full h-[80px] flex max-md:px-[12px] px-[40px] max-md:h-[40px] justify-between items-center bg-black01 text-white">
            <img
              src={logoWhite}
              className="w-12 h-12 max-md:w-7 max-md:h-7 max-md:object-cover"
            />
            <p className="font-unifrakturCook text-[40px] max-md:text-[24px]">
              Earth Talk
            </p>
            <button
              className="font-pretendard font-bold text-[18px] max-md:text-[12px]"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          </div>
        ) : (
          <div
            className={`w-full h-[80px] flex max-md:px-[12px] px-[40px] max-md:h-[40px] shadow-md justify-between items-center  
            ${
              status === "debate-waiting"
                ? "text-white bg-black shadow-lg"
                : "bg-white border-b border-gray03"
            }`}
          >
            <div
              className={`${
                role === "ROLE_ADMIN"
                  ? "w-[550px] max-md:w-[270px]"
                  : "w-[440px] max-md:w-[220px]"
              } flex h-[53px] justify-between items-center`}
            >
              <Link to={"/main"}>
                <img
                  src={status === "debate-waiting" ? logoWhite : logo}
                  className="w-6 h-6 md:w-11 md:h-11 max-md:object-cover"
                />
              </Link>
              <div
                className={`${
                  role === "ROLE_ADMIN"
                    ? "w-[460px] max-md:w-[220px]"
                    : "w-[360px] max-md:w-[180px]"
                } flex h-[29px] justify-between text-[24px] max-md:text-[13px] items-center font-sofiaSans text-black01`}
              >
                <Link to={"/news?continent=all"}>News</Link>
                <Link to={"/debate-rooms"}>Debate Rooms</Link>
                <Link to={"/debaters"}>Debaters</Link>
                {role === "ROLE_ADMIN" && <Link to={"/admin"}>Admin</Link>}
              </div>
            </div>
            <div className="flex items-center gap-1 space-x-1 md:space-x-4">
              {role !== "ROLE_ADMIN" && (
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <div className="relative">
                    <img
                      className="max-md:w-[11px] max-md:h-[14px]"
                      src={
                        status === "debate-waiting"
                          ? notificationWhite
                          : notification
                      }
                      alt="알림"
                    />
                    {data?.pages[0].data.unreadCount > 0 && (
                      <span className="absolute top-[-3px] right-[-10px]  bg-red-500 text-white text-[10px] font-bold px-1 rounded-full">
                        {data?.pages[0].data.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              )}

              <button onClick={() => navigate(`/user-page/${userId}`)}>
                <img
                  className="md:w-[35px] w-[16px] md:h-[35px] h-[16px] rounded-full"
                  src={
                    profileUrl ||
                    (status === "debate-waiting" ? profileWhite : profile)
                  }
                  alt="프로필 사진"
                />
              </button>
              {isNotificationOpen && (
                <NotificationList
                  status={status}
                  onClose={() => setIsNotificationOpen(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="pt-[40px] md:pt-[80px]"></div>
    </>
  );
}
