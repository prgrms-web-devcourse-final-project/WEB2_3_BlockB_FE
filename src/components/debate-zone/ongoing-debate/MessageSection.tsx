import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import profile from "../../../assets/icons/profile-white.svg";
import send from "../../../assets/icons/send.svg";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
import { useRoomStore } from "../../../stores/roomStateStore";
import { userApi } from "../../../api/user";

export default function MessageSection() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Context에서 WebSocket 관련 상태와 함수 가져오기
  const { messages, sendMessage, isMyTurn } = useDebateWebSocket();

  // 메시지가 업데이트될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { roomSettings } = useRoomStore();
  const [userNickname, setUserNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserNickname = async () => {
      const userResponse = await userApi.fetchMyProfile();
      setUserNickname(userResponse.data.nickname);
    };

    fetchUserNickname();
  }, []);

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        event: "MESSAGE",
        userName: userNickname,
        position: roomSettings.stance,
        message: currentMessage,
        timestamp: new Date().toISOString(),
      };
      sendMessage(JSON.stringify(newMessage));
      setCurrentMessage("");
    }
  };

  return (
    <div
      id="message-section"
      className="w-full flex-1 flex flex-col max-h-[calc(100vh-40px)] overflow-hidden"
    >
      {/* 메시지 로그 영역 */}
      <div className="flex-grow overflow-y-auto gap-[10px] md:m-3 m-2 rounded-sm">
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            message={msg.message}
            nickname={msg.userName!} 
            profile={profile}
            isMine={msg.userName === userNickname}
            isOppenent={roomSettings.stance !== msg.position || false}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      {/* 입력창 */}
      <div
        className={`md:h-[50px] h-[30px] flex justify-between items-center bg-white bg-opacity-30 border p-2 mx-[10px] my-[10px] rounded-md ${
          !isMyTurn ? "bg-gray-300" : ""
        }`}
      >
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && isMyTurn) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={!isMyTurn}
          className={`appearance-none border-none outline-none focus:ring-0 bg-transparent w-full placeholder:text-gray02 placeholder:font-light text-white font-bold md:text-[16px] text-[14px] ${
            !isMyTurn ? "text-gray-500" : ""
          }`}
        />
        <button
          onClick={handleSendMessage}
          disabled={!isMyTurn}
          className={!isMyTurn ? "opacity-50 cursor-not-allowed" : ""}
        >
          <img
            src={send}
            className="md:w-[23px] md:h-[23px] w-[17px] h-[17px]"
          />
        </button>
      </div>
    </div>
  );
}
