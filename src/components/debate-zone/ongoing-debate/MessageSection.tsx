import { useEffect, useRef, useState } from "react";

import MessageItem from "./MessageItem";
import profile from "../../../assets/icons/profile-white.svg";
import send from "../../../assets/icons/send.svg";

export default function MessageSection() {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const addMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // 메시지가 업데이트될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col pb-[30px] pt-[20px] font-pretendard">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-[10px]">
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            profile={profile}
            isMine={false}
            isOppenent={index % 2 === 0} // 임시로 퍼블리싱 위해서 상대방 메시지랑 주고 받을 수 있도록 함
          />
        ))}
        {/* 스크롤 끝을 위한 div */}
        <div ref={messageEndRef} />
      </div>

      {/* 메시지 입력란 */}
      <div className="flex justify-between bg-white bg-opacity-30 border p-2 mx-[10px] my-[10px] rounded-md">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={currentMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentMessage.trim()) {
              addMessage(currentMessage);
              setCurrentMessage("");
            }
          }}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="appearance-none border-none outline-none focus:ring-0 bg-transparent  w-full placeholder:text-gray02 placeholder:font-light text-white font-bold"
        />
        <button
          onClick={() => {
            if (currentMessage.trim()) {
              addMessage(currentMessage);
              setCurrentMessage("");
            }
          }}
        >
          <img src={send} />
        </button>
      </div>
    </div>
  );
}
