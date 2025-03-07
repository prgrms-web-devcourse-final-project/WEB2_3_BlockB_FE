import { useEffect, useState } from "react";
import MatchingInterface from "./MatchingInterface";
import ParticipantBox from "../ParticipantBox";
import WaitingInfoDrodown from "../InfoDrodown";
import { useRoomStore } from "../../../stores/roomStateStore";
import Ment from "./Ment";
// import useWebSocket from "react-use-websocket";
// import { useParams } from "react-router";
// import { userApi } from "../../../api/user";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [countDown, setCountDown] = useState(5);
  // const [userNickname, setUserNickname] = useState<string | null>(null); // 초기값 null
  const { setRoomState, roomSettings } = useRoomStore();

  // const { roomId } = useParams<{ roomId: string }>();

  // useEffect(() => {
  //   const fetchUserNickname = async () => {
  //     const userResponse = await userApi.fetchMyProfile();
  //     setUserNickname(userResponse.data.nickname);
  //   };

  //   fetchUserNickname();
  // }, [roomId]);

  // const WS_URL = import.meta.env.VITE_WS_URL;
  // const websocketSendUrl = `${WS_URL}/debate/${roomId}`;

  // const { sendMessage } = useWebSocket(websocketSendUrl, {
  //   onOpen: () => {
  //     if (!userNickname) return; 

  //     console.log("웹소켓이 열렸습니다! send!");
  //     sendMessage(
  //       JSON.stringify({
  //         event: "JOIN",
  //         userName: userNickname,
  //         position: roomSettings.stance,
  //         message: `${userNickname} 님이 입장하였습니다.ddd test`,
  //         timestamp: new Date(),
  //       })
  //     );
  //   },
  //   onClose: (event) => console.log("🔴 WebSocket 연결 닫힘:", event),
  //   onError: (error) => console.log("❌ WebSocket 에러:", error),
  //   shouldReconnect: () => true, 
  // }, userNickname !== null);

  useEffect(() => {
    if (!isWaiting) {
      setCountDown(5);
      const interval = setInterval(() => {
        setCountDown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isWaiting]);

  useEffect(() => {
    if (countDown === 0 && !isWaiting) {
      setRoomState("ongoing");
    }
  }, [countDown, isWaiting]);

  return (
    <section className="md:px-[40px] px-[20px] flex flex-col gap-[250px] relative">
      <div className="flex justify-between gap-2">
        <WaitingInfoDrodown />
        <ParticipantBox label="OPONENTS" labelAlignment="end" />
      </div>
      <MatchingInterface isWaiting={isWaiting} />

      {isWaiting ? (
        <Ment />
      ) : (
        <div className="text-white md:text-2xl sm:text-[16px] text-[14px] font-bold w-full text-center">
          <h3 className="mb-5">매칭이 완료되었습니다. 곧 토론이 시작됩니다.</h3>
          <p>{countDown}</p>
        </div>
      )}
      <button
        className="z-50 bg-gray02 text-black01"
        onClick={() => setIsWaiting(!isWaiting)}
      >
        임시 대기완료 이동 버튼
      </button>
    </section>
  );
}
