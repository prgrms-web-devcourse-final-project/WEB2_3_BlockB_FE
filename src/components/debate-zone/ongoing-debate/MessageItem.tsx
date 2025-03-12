import announceProfile from "../../../assets/icons/announce-profile.svg"
export default function MessageItem({
  uniqueKey,
  message,
  nickname,
  profile,
  isOppenent = false, // 상대방 편 메시지 여부
  isMine = true, // 내 메시지 여부(우측 정렬 중 내 메시지)
}: {
  uniqueKey: string;
  message: string;
  nickname: string;
  profile: string;
  isOppenent?: boolean;
  isMine?: boolean;
}) {
  return (
    <div
      key={uniqueKey}
      className={`flex w-full ${
        isOppenent ? "justify-start" : "justify-end"
      } gap-[10px] font-bold md:text-[16px] text-[14px]`}
    >
      <figure
        className={`rounded-full ${isOppenent ? "order-first" : "order-last"}`}
      >
        <img src={nickname ==="공지" ? announceProfile : profile} className="rounded-full bg-cover md:w-[35px] md:h-[35px] w-[30px] h-[30px]" />
      </figure>

      <div
        className={`flex flex-col  gap-[6px] ${
          isOppenent ? "items-start" : "items-end"
        }`}
      >
        <div className={`text-white text-${isOppenent ? "left" : "right"}`}>
          {nickname}
        </div>
        <div
          className={`${
            isMine
              ? "bg-white text-black01"
              : nickname === "공지" ? "bg-game_blue01 bg-opacity-80 text-white" : "bg-white bg-opacity-50 text-black01"
          }  md:px-3 md:py-[6px] px-2 py-1 rounded-md md:max-w-[300px] sm:max-w-[320px] max-w-[300px] break-words h-auto `}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
