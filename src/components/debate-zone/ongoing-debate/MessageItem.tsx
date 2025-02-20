export default function MessageItem({
  key,
  message,
  profile,
  isOppenent = false, // 상대방 편 메시지 여부
  isMine = true, // 내 메시지 여부(우측 정렬 중 내 메시지)
}: {
  key: number;
  message: string;
  profile: string;
  isOppenent?: boolean;
  isMine?: boolean;
}) {
  return (
    <div
      key={key}
      className={`flex w-full ${
        isOppenent ? "justify-start" : "justify-end"
      } gap-[10px] font-bold`}
    >
      <figure
        className={`rounded-full ${isOppenent ? "order-first" : "order-last"}`}
      >
        <img src={profile} className="bg-cover w-[35px] h-[35px]" />
      </figure>

      <div
        className={`flex flex-col  gap-[6px] ${
          isOppenent ? "items-start" : "items-end"
        }`}
      >
        <div className={`text-white text-${isOppenent ? "left" : "right"}`}>
          nickname
        </div>
        <div
          className={`${
            isMine
              ? "bg-white text-black01"
              : "bg-white bg-opacity-50 text-black01"
          }   p-2 rounded-md max-w-[400px]  `}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
