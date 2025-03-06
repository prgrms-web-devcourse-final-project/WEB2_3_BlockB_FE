import RoomActionButtons from "../debate-zone/RoomActionButtons";
import { useModalStore } from "../../stores/useModal";

export default function Modal() {
  const { isOpen, message, onConfirm, closeModal, btnType } = useModalStore();

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black01 z-50 bg-opacity-70 flex flex-col justify-center items-center font-pretendard">
      <div className="bg-white flex flex-col h-auto w-[298.6px] gap-[10px] justify-center px-[50px] py-[30px] rounded-[10px] whitespace-pre-line">
        <p className="text-black01 font-bold w-full break-words whitespace-pre-line text-center">
          {message}
        </p>
        <div className="flex justify-center">
          <RoomActionButtons
            cancelAction={closeModal}
            confirmAction={() => {
              onConfirm();
              closeModal();
            }}
            cancelColor="bg-gray03 text-white"
            confirmColor="bg-blue01 text-white"
            confirmText="확인"
            btnType={btnType}
          />
        </div>
      </div>
    </div>
  );
}
