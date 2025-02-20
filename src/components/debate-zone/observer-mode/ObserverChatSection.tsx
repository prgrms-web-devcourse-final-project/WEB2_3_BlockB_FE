import ChatObserverChatBubble from "./ChatObserverChatBubble.tsx";

// ObserverChatSection 컴포넌트
export default function ObserverChatSection() {
  return (
    <div className="w-[378px] h-[376px] p-[10px] font-pretendard flex flex-col gap-[10px] overflow-y-auto">
      {/* 상대방 메시지 */}
      <ChatObserverChatBubble
        isMine={false}
        username="imaria0218"
        message="저는 기술 발전이 반드시 인간의 행복을 보장하는 것은 아니라고 생각해요. 오히려 기술이 발달할수록 인간관계가 단절되는 경우도 많죠."
      />

      {/* 내 메시지 */}
      <ChatObserverChatBubble
        isMine={true}
        username="debatemasteR"
        message="흥미로운 시각이네요! 하지만 기술이 없었다면 이렇게 온라인으로 토론하는 것도 불가능했을 텐데요. 연결의 방식이 변한 것뿐이지 않을까요?"
      />
    </div>
  );
}
