import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import profile from "../../../assets/icons/profile-white.svg";
import send from "../../../assets/icons/send.svg";
import { useDebateWebSocket } from "../../../contexts/DebateWebSocketContext";
import { useRoomStore } from "../../../stores/roomStateStore";
import { userApi } from "../../../api/user";

export default function MessageSection() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isComposing, setIsComposing] = useState<boolean>(false); // Track IME composition state
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, isMyTurn, position } = useDebateWebSocket();

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { roomSettings } = useRoomStore();
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserNickname = async () => {
      const userResponse = await userApi.fetchMyProfile();
      setUserNickname(userResponse.data.nickname);
      setImageUrl(userResponse.data.profileUrl);
    };

    fetchUserNickname();
  }, []);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        event: "MESSAGE",
        userName: userNickname,
        imageUrl: imageUrl,
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
      {/* Message log area */}
      <div className="flex-grow overflow-y-auto flex flex-col gap-[20px] md:m-3 m-2 rounded-sm">
        {messages.map((msg, index) => (
          <MessageItem
            uniqueKey={`${index}${msg.timestamp}`}
            message={msg.message}
            nickname={msg.userName || "공지"}
            profile={msg.imageUrl || profile}
            isMine={msg.userName === userNickname}
            isOppenent={position !== msg.position}
          />
        ))}
        <div ref={messageEndRef} />
      </div>
      {/* Input area */}
      <form
        className={`md:h-[50px] h-[30px] flex justify-between items-center bg-white bg-opacity-30 border p-2 mx-[10px] my-[10px] rounded-md ${
          !isMyTurn ? "bg-gray-300" : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          if (!isComposing) {
            handleSendMessage();
          }
        }}
      >
        <input
          type="text"
          placeholder={isMyTurn? "메시지를 입력하세요" : "발언 시간이 아닙니다"}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={(e) => {
            setIsComposing(false);
            setCurrentMessage(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) {
              e.preventDefault();
              if (isMyTurn) {
                handleSendMessage();
              }
            }
          }}
          className={`appearance-none border-none outline-none focus:ring-0 bg-transparent w-full placeholder:text-gray02 placeholder:font-light text-white font-bold md:text-[16px] text-[14px] ${
            !isMyTurn ? "text-gray-500" : ""
          }`}
          disabled={!isMyTurn}
        />
        <button
          type="submit"
          disabled={!isMyTurn || isComposing}
          className={!isMyTurn ? "opacity-50 cursor-not-allowed" : ""}
        >
          <img
            src={send}
            className="md:w-[23px] md:h-[23px] w-[17px] h-[17px]"
            alt="Send"
          />
        </button>
      </form>
    </div>
  );
}
