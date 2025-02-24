import { useState } from "react";
import { createPortal } from "react-dom";
import check from "../../../assets/icons/checked1.svg";
import { reportReasons as initialReportReasons } from "../../../constants";
import RoomActionButtons from "../RoomActionButtons";
import { useReportStore } from "../../../stores/reportModalStore";

export default function ReportModal() {
  const [reportReasons, setReportReasons] = useState(initialReportReasons);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [description, setDescription] = useState("");

  const {isReportModalOpen, setIsReportModalOpen} = useReportStore()
  const handleCheckboxChange = (selectedKey: string | boolean | number) => {
    setReportReasons((prev) =>
      prev.map((item) => ({
        ...item,
        isChecked: item.dbKey === selectedKey,
      }))
    );
    setHasCompleted(true);
  };

  const handleConfirm = () => {
    const selectedReason = reportReasons.find((item) => item.isChecked);
    if (!selectedReason) return;
    setIsReportModalOpen(false);
  };

  if(isReportModalOpen) return createPortal(
    <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 bg-black01 z-50 bg-opacity-70 flex justify-center items-center">
      <div className="flex flex-col gap-[10px] bg-white w-[265px] h-auto rounded-[10px] px-[30px] py-[18px]">
        <p className="font-bold text-[16px] text-black01">신고하기</p>
        <p className="text-[14px] text-gray01 h-[23px] border-b border-gray03">
          기도차
        </p>
        <p className="font-bold text-black01 text-[14px]">옵션</p>
        <div className="flex flex-col gap-2 text-gray01">
          {reportReasons.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-[10px] cursor-pointer"
              htmlFor={`report-checkbox-${item.dbKey}`}
            >
              <input
                id={`report-checkbox-${item.dbKey}`}
                type="checkbox"
                className="hidden"
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(item.dbKey)}
              />
              <span className="w-[20px] h-[20px] rounded-full border border-gray03 flex justify-center items-center">
                {item.isChecked && <img src={check} alt="Checked" />}
              </span>
              <p>{item.key}</p>
            </label>
          ))}
        </div>
        <p className="font-bold text-black01 text-[14px]">설명</p>
        <input
          type="text"
          className="h-[40px] border border-gray03 px-2 focus:outline-none rounded-lg text-[14px]"
          placeholder="추가 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <RoomActionButtons
            cancelAction={() => {
              console.log("신고 취소됨");
              setReportReasons(initialReportReasons);
              setHasCompleted(false);
              setDescription("");
              setIsReportModalOpen(false);
            }}
            confirmAction={handleConfirm}
            cancelColor="bg-gray03 text-white"
            confirmColor="bg-blue01 text-white"
            confirmText="신고"
            hasCompleted={hasCompleted}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
