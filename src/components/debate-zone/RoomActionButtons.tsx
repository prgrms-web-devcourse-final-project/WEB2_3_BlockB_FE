export default function RoomActionButtons({
  cancelAction,
  confirmAction,
  cancelColor,
  confirmColor,
  confirmText,
  hasCompleted,
}: {
  cancelAction: () => void;
  confirmAction: () => void;
  cancelColor: string;
  confirmColor: string;
  confirmText: string;
  hasCompleted: boolean;
}) {
  return (
    <div className="text-[14px] flex gap-[10px] font-bold">
      {/* 취소 버튼 */}
      <button
        onClick={cancelAction}
        className={`w-[48px] h-[30px] px-[10px] py-[7px] rounded-lg  ${cancelColor} hover:bg-opacity-50`}
      >
        취소
      </button>
      {/* 확인 버튼 */}
      <button
        onClick={confirmAction}
        className={`w-[48px] h-[30px] px-[10px] py-[7px] rounded-lg  ${confirmColor}  ${
          hasCompleted && "shadow-game-blue"
        }hover:bg-opacity-50 `}
      >
        {confirmText}
      </button>
    </div>
  );
}
