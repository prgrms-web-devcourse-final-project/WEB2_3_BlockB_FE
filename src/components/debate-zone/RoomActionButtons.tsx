export default function RoomActionButtons({
  cancelAction,
  confirmAction,
  cancelColor,
  confirmColor,
  confirmText,
  hasCompleted=false,
  btnType = "TWO"
}: {
  cancelAction: () => void;
  confirmAction: () => void;
  cancelColor: string;
  confirmColor: string;
  confirmText: string;
  hasCompleted?: boolean;
  btnType?: "ONE" | "TWO"
}) {
  return (
    <div className="text-[14px] flex gap-[10px] font-bold">
      {/* 취소 버튼 */}
      {btnType === "TWO" && <button
        onClick={cancelAction}
        className={`h-[30px] px-[10px] rounded-lg flex items-center justify-center leading-normal ${cancelColor} hover:bg-opacity-50`}
      >
        취소
      </button>}

      {/* 확인 버튼 */}
      <button
        onClick={confirmAction}
        className={`h-[30px] px-[10px] rounded-lg flex items-center justify-center leading-normal transition-all duration-300 ${
          hasCompleted
            ? `${confirmColor} shadow-[0px_1px_5px_0px_rgba(56,111,217,1.00)] border border-game-blue01 scale-105`
            : "bg-gray03 text-gray01"
        } hover:bg-opacity-50`}
      >
        {confirmText}
      </button>
    </div>
  );
}
