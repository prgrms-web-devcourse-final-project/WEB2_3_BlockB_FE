import { useEffect, useRef, useState } from "react";

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
    <div className="w-full h-full flex flex-col py-[30px]">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex w-full justify-end gap-[10px] font-bold"
          >
            <div className="flex flex-col items-end ">
              <div className="text-white text-right">nickname</div>
              <div className="bg-blue-500  text-white p-2 rounded-md">
                {message}
              </div>
            </div>
            <figure>
              <img src={profile} />
            </figure>
          </div>
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
