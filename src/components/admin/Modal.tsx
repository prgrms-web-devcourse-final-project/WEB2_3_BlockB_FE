import { useEffect, useState } from "react";
import { editOptions } from "../../constants/index";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center font-bold font-pretendard">
      <div className="w-[858px] h-[503px]  bg-[#FFFFFF] px-8 py-5 flex flex-col justify-between rounded-[10px]">
        <p>{modalType === "edit" ? "변경하기" : ""} </p>
        <p>닉네임: 기도차</p>
        {modalType === "check" ? (
          <div className="bg-blue06 rounded-[10px] h-80 pt-4 pl-4 flex flex-col gap-y-6">
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
                className="underline"
              >
                토론방 링크
              </a>
              |
              <a
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                유저 링크
              </a>
            </p>
          </div>
        ) : (
          ""
        )}
        {modalType === "recover" ? (
          <div className="bg-blue06 rounded-[10px] h-80 pt-4 pl-4 flex flex-col gap-y-4">
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
          <div className="bg-blue06 rounded-[10px] h-80 pt-4 pl-4 flex flex-col gap-y-4">
            <p>신고된 내용 </p>
            <p className="ml-4">내용 내용 내용 내용 내용</p>
            <div className="flex items-center">
              <p>처리 옵션</p>
              <div className="flex w-[404px] justify-between ml-8">
                {editOptions.map((editOption) => (
                  <FilterButton
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
            <textarea className="w-[736px] h-[108px] resize-none rounded-[10px] px-4 py-4"></textarea>
          </div>
        ) : (
          ""
        )}
        {modalType === "edit" ? (
          <div className="bg-blue06 rounded-[10px] h-80 pt-4 pl-4 flex flex-col gap-y-4">
            <p>신고된 내용 </p>
            <p className="ml-4">내용 내용 내용 내용 내용</p>
            <div className="flex items-center">
              <p>변경 옵션</p>
              <div className="flex w-[404px] justify-between ml-8">
                {editOptions.map((editOption) => (
                  <FilterButton
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
            <textarea className="w-[736px] h-[108px] resize-none rounded-[10px] px-4 py-4">
              asdasdasdas
            </textarea>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-end">
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
