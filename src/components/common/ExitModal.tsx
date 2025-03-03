import { useNavigate } from "react-router";
import RoomActionButtons from "../debate-zone/RoomActionButtons";

export default function ExitModal({
  setIsExitModalOpen,
}: {
  setIsExitModalOpen: (isopen: boolean) => void;
}) {
  const navigate = useNavigate();
  const closeModal = () => {
    setIsExitModalOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black01 z-50 bg-opacity-70 flex flex-col justify-center items-center font-pretendard">
      <div className="bg-white flex flex-col gap-[10px] justify-center px-[67px] py-[30px] rounded-[10px]">
        <p className="text-black01 font-bold">정말로 나가시겠습니까?</p>
        <div className="flex justify-center">
          <RoomActionButtons
            cancelAction={closeModal}
            confirmAction={() => {
              closeModal();
              navigate("/main");
            }}
            cancelColor="bg-gray03 text-white"
            confirmColor="bg-blue01 text-white"
            confirmText="확인"
          />
        </div>
      </div>
    </div>
  );
}
