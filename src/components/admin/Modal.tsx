import { useEffect, useState } from "react";
import { editOptions } from "../../constants";
import FilterButton from "./FilterButton";

export default function Modal({
  check,
  onCheck,
  recover,
  onRecover,
  process,
  onProcess,
  edit,
  onEdit,
  modalType,
}: {
  check?: boolean;
  onCheck?: (value: boolean) => void;
  recover?: boolean;
  onRecover?: (value: boolean) => void;
  process?: boolean;
  onProcess?: (value: boolean) => void;
  edit?: boolean;
  onEdit?: (value: boolean) => void;
  modalType: string;
}) {
  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden"; // 스크롤 방지
    return () => {
      document.body.style.overflow = "auto"; // 언마운트 시 복원
    };
  }, []);
  const [reason, setReason] = useState("warn");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-bold font-pretendard p-5">
      <div className="w-full max-w-[858px] sm:w-[90%] max-h-[90vh] overflow-y-auto bg-white px-4 sm:px-6 md:px-8 py-5 flex flex-col justify-between rounded-lg">
        <p className="text-lg sm:text-xl">
          {modalType === "edit" ? "변경하기" : ""}
        </p>
        <p className="text-sm sm:text-base">닉네임: 기도차</p>
        {modalType === "check" ? (
          <div className="bg-blue06 rounded-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto flex flex-col gap-y-4 text-sm sm:text-base">
            <p>신고 사유: 욕설</p>
            <p>신고자: 도기차</p>
            <p>신고내용: 해당 유저 욕설 사용</p>
            <p>신고 날짜: 2025-02-13</p>
            <p>
              신고 위치:
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1"
              >
                토론방 링크
              </a>
              |
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1"
              >
                유저 링크
              </a>
            </p>
          </div>
        ) : (
          ""
        )}
        {modalType === "recover" ? (
          <div className="bg-blue06 rounded-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto flex flex-col gap-y-4 text-sm sm:text-base">
            <p>처리 조치: 경고</p>
            <p>신고 사유: 욕설</p>
            <p>신고내용: 해당 유저 욕설 사용</p>
            <p>처리 사유: 욕</p>
            <p>처리 담당자: 도차기</p>
            <p>처리 날짜: 2025-02-13</p>
          </div>
        ) : (
          ""
        )}
        {modalType === "process" ? (
          <div className="bg-blue06 rounded-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto flex flex-col gap-y-4 text-sm sm:text-base">
            <p>신고된 내용</p>
            <p className="ml-4">내용 내용 내용 내용 내용</p>
            <div className="flex flex-col sm:flex-row whitespace-nowrap items-start sm:items-center">
              <p>처리 옵션</p>
              <div className="flex w-full overflow-x-auto ml-0 sm:ml-8 ">
                {editOptions.map((editOption) => (
                  <FilterButton
                    key={editOption.value}
                    label={editOption.label}
                    value={editOption.value}
                    width={editOption.width}
                    onClick={setReason}
                    selected={reason === editOption.value}
                  />
                ))}
              </div>
            </div>
            <p>처리사유</p>
            <textarea className="w-full   h-[108px] resize-none rounded-lg px-4 py-4 border border-gray-300"></textarea>
          </div>
        ) : (
          ""
        )}
        {modalType === "edit" ? (
          <div className="bg-blue06 rounded-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto flex flex-col gap-y-4 text-sm sm:text-base">
            <p>신고된 내용</p>
            <p className="ml-4">내용 내용 내용 내용 내용</p>
            <div className="flex flex-col sm:flex-row whitespace-nowrap items-start sm:items-center">
              <p>변경 옵션</p>
              <div className="flex w-full overflow-x-auto ml-0 sm:ml-8 ">
                {editOptions.map((editOption) => (
                  <FilterButton
                    key={editOption.value}
                    label={editOption.label}
                    value={editOption.value}
                    width={editOption.width}
                    onClick={setReason}
                    selected={reason === editOption.value}
                  />
                ))}
              </div>
            </div>
            <p>처리사유</p>
            <textarea className="w-full   h-[108px] resize-none rounded-lg px-4 py-4 border border-gray-300"></textarea>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-wrap justify-end gap-2 sm:gap-4 mt-4">
          {modalType === "check" ? (
            <button
              onClick={() => {
                onCheck!(!check);
              }}
              className="w-20 h-10 border border-solid border-gray04 rounded-[10px]"
            >
              취소
            </button>
          ) : (
            ""
          )}
          {modalType === "recover" ? (
            <div>
              <button className="w-20 h-10 border border-solid bg-blue03 text-white rounded-[10px]">
                복구하기
              </button>
              <button
                onClick={() => {
                  onRecover!(!recover);
                }}
                className="w-20 h-10 border border-solid border-gray04 rounded-[10px] ml-4"
              >
                취소
              </button>
            </div>
          ) : (
            ""
          )}
          {modalType === "process" ? (
            <div>
              <button className="w-20 h-10 border border-solid bg-blue03 text-white rounded-[10px]">
                처리완료
              </button>
              <button
                onClick={() => {
                  onProcess!(!process);
                }}
                className="w-20 h-10 border border-solid border-gray04 rounded-[10px] ml-4"
              >
                취소
              </button>
            </div>
          ) : (
            ""
          )}
          {modalType === "edit" ? (
            <div>
              <button className="w-20 h-10 border border-solid bg-blue03 text-white rounded-[10px]">
                변경하기
              </button>
              <button
                onClick={() => {
                  onEdit!(!edit);
                }}
                className="w-20 h-10 border border-solid border-gray04 rounded-[10px] ml-4"
              >
                취소
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
