import { useEffect, useState } from "react";
import MatchingInterface from "./MatchingInterface";
import ParticipantBox from "../ParticipantBox";
import WaitingInfoDrodown from "../InfoDrodown";
import { useRoomStore } from "../../../stores/roomStateStore";
import Ment from "./Ment";
import { useParams } from "react-router";
import { userApi } from "../../../api/user";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
// import useWebSocket from "react-use-websocket";
// import { useParams } from "react-router";
// import { userApi } from "../../../api/user";

export default function WaitingRoom() {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const [countDown, setCountDown] = useState(5);
  const [userNickname, setUserNickname] = useState<string | null>(null); 
  const { setRoomState, roomSettings, setRoomSettings } = useRoomStore();
  const {sendMessage} = useDebateWebSocket()

  const { roomId } = useParams<{ roomId: string }>();
  const stanceFromState = "PRO" // TODO: 임시 속성으로 나중에 바꾸어야 합니다
  useEffect(() => {
    const fetchUserNickname = async () => {
      const userResponse = await userApi.fetchMyProfile();
      setUserNickname(userResponse.data.nickname);
    };

    fetchUserNickname();
    setRoomSettings("stance", stanceFromState || roomSettings.stance);
    const newMessage = {
      event: "JOIN",
      userName: userNickname,
      position: roomSettings.stance,
      message: `${userNickname}님이 입장하셨습니다`,
      timestamp: new Date().toISOString(),
    };
    sendMessage(JSON.stringify(newMessage));
  }, [roomId]);



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
