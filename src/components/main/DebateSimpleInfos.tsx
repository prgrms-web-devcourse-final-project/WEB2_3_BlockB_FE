import { useEffect, useState } from "react";
import DebateSimpleInfo from "./DebateSimpleInfo";
import { DebateSimpleInfosSkeleton } from "../common/skeleton/main/DebateSimpleInfosSkeleton";
import { Client, IMessage, Frame } from "@stomp/stompjs";

export default function DebateSimpleInfos({ tab }: { tab: boolean }) {
  const [isLoading, setIsLoading] = useState(true);
  const [debateData, setDebateData] = useState<
    {
      roomId: string;
      title: string;
      speakCountType: number;
      timeType: number;
      memberNumberType: number;
      categoryType: string;
    }[]
  >([]);

  useEffect(() => {
    console.log("STOMP 웹소켓 활성화 시도...");
    const WS_URL = import.meta.env.VITE_WS_URL;
    const client = new Client({
      brokerURL: `${WS_URL}/room-list/filtered`,
      connectHeaders: {},
      debug: (msg) => console.log("[STOMP DEBUG]:", msg),
      reconnectDelay: 5000,
    });

    client.onConnect = (frame: Frame) => {
      console.log("STOMP 웹소켓 연결 성공:", frame);

      if (client.connected) {
        client.publish({
          destination: "/app/filteredUpdate",
          body: JSON.stringify({ message: "최신 토론방 요청" }),
        });
        console.log("웹소켓 메시지 전송 완료!");
      }

      client.subscribe("/topic/filteredStatus", (message: IMessage) => {
        try {
          const parsedData = JSON.parse(message.body);
          console.log("웹소켓 메시지 수신:", parsedData);
          const observerData =
            parsedData.observerCurrent?.map((item: any) => {
              const room = item.debateRoomResponse || {};

              return {
                roomId: room.uuid || "unknown",
                title: room.title || "제목 없음",
                speakCountType: room.speakCountType ?? 1,
                timeType: room.timeType ?? 1,
                memberNumberType: room.memberNumberType ?? 1,
                categoryType: room.categoryType || "ETC",
              };
            }) || [];

          setDebateData((prevData) => {
            const slicedData = observerData.slice(0, 10);
            if (JSON.stringify(slicedData) !== JSON.stringify(prevData)) {
              return slicedData;
            }
            return prevData;
          });

          setIsLoading(false);
        } catch (error) {
          console.error("웹소켓 데이터 변환 오류:", error);
        }
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <div className={`${tab ? "hidden" : "flex flex-col "}`}>
      {isLoading ? (
        <DebateSimpleInfosSkeleton count={5} />
      ) : (
        debateData.map((data, index) => (
          <DebateSimpleInfo
            key={data.roomId}
            index={index + 1}
            title={data.title}
            speakCountType={data.speakCountType}
            timeType={data.timeType}
            memberNumberType={data.memberNumberType}
            categoryType={data.categoryType}
            roomId={data.roomId}
          />
        ))
      )}
    </div>
  );
}
