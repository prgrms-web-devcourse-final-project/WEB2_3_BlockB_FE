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
        <div
          id="message-section"
          className="w-full flex-1 flex flex-col max-h-[calc(100vh-40px)] overflow-hidden"
        >
        {/* 메시지 로그 영역 */}
        <div className="flex-grow overflow-y-auto gap-[10px] md:m-3 m-2 rounded-sm">
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              message={message}
              profile={profile}
              isMine={false}
              isOppenent={index % 2 === 0}
            />
          ))}
          <div ref={messageEndRef}/>
        </div>
      {/* 입력창 */}
        <div className="md:h-[50px] h-[30px] flex justify-between items-center bg-white bg-opacity-30 border p-2 mx-[10px] my-[10px] rounded-md">
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
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent w-full placeholder:text-gray02 placeholder:font-light text-white font-bold  md:text-[16px] text-[14px]"
          />
          <button
            onClick={() => {
              if (currentMessage.trim()) {
                addMessage(currentMessage);
                setCurrentMessage("");
              }
            }}
          >
            <img src={send} className="md:w-[23px] md:h-[23px] w-[17pxs] h-[17px]"/>
          </button>
        </div>
      </div>
  );
}
