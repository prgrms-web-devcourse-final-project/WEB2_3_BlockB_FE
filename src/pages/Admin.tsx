import { useState } from "react";
import FilterButton from "../components/admin/FilterButton";
import search from "../assets/icons/search-black.svg";
import ReportTable from "../components/admin/ReportTable";
import Modal from "../components/admin/Modal";
import Pagination from "../components/common/Pagenation";
import { usePagination } from "../hooks/usePagenation";
import {
  processedFilters,
  processedHeader,
  unProcessedFilters,
  unProcessedHeader,
} from "../constants/index";

export default function Admin() {
  const [tab, setTab] = useState(true);
  const [reason, setReason] = useState("all");

  const [check, setCheck] = useState(false);
  const [recover, setRecover] = useState(false);
  const [process, setProcess] = useState(false);
  const [edit, setEdit] = useState(false);

  const processedBody = [
    {
      reason: "음란/선정성",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "스팸/광고",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "욕설/인신공격",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "도배",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "개인정보 노출",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "사유없는 탈주",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "음란/선정성",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "스팸/광고",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "욕설/인신공격",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "도배",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "개인정보 노출",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
    {
      reason: "사유없는 탈주",
      reporter: "기도차",
      name: "차도기",
      date: "2025-02-13",
    },
  ];

  const unProcessedBody = [
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
    {
      option: "경고",
      name: "기도차",
      admin: "차도기",
      reason: "음란/선정성",
      date: "2025-02-13",
    },
  ];
  const itemsPerPage = 5;
  const {
    paginatedData: paginatedProcessedBody,
    currentPage: processedCurrentPage,
    totalPages: processedTotalPages,
    handlePageChange: handleProcessedPageChange,
  } = usePagination(processedBody, itemsPerPage);
  const {
    paginatedData: paginatedUnProcessedBody,
    currentPage: unProcessedCurrentPage,
    totalPages: unProcessedTotalPages,
    handlePageChange: handleUnProcessedPageChange,
  } = usePagination(unProcessedBody, itemsPerPage);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[980px] h-auto mt-[50px] pt-7 pl-7 pr-7">
          <p className="text-[24px] font-bold md:text-[32px]">신고 목록</p>
          <div className="flex border-b-[1px] border-gray03 border-solid text-[16px] font-bold my-5">
            <button
              onClick={() => setTab(true)}
              className={`${
                tab
                  ? "mr-4 border-b-2 border-solid border-blue01 text-blue03"
                  : "text-gray04"
              }`}
            >
              미처리
            </button>
            <button
              onClick={() => setTab(false)}
              className={`${
                tab
                  ? "text-gray04"
                  : "ml-4 border-b-2 border-solid border-blue01 text-blue03"
              }`}
            >
              처리
            </button>
          </div>
          <div className="flex items-center">
            <p className="text-[14px] md:text-[16px] h-5 text-gray01 mr-6 whitespace-nowrap">
              {tab ? "신고 사유" : "처리 옵션"}
            </p>
            <div
              className={`${
                tab ? "w-[814px] " : "w-[375px]"
              } h-[40px] flex justify-between text-[14px]  overflow-x-auto  `}
            >
              {tab
                ? processedFilters.map((filter) => (
                    <FilterButton
                      key={filter.value}
                      label={filter.label}
                      value={filter.value}
                      selected={reason === filter.value}
                      onClick={setReason}
                      width={filter.width}
                    />
                  ))
                : unProcessedFilters.map((filter) => (
                    <FilterButton
                      key={filter.value}
                      label={filter.label}
                      value={filter.value}
                      selected={reason === filter.value}
                      onClick={setReason}
                      width={filter.width}
                    />
                  ))}
            </div>
          </div>
          <div className="flex bg-white border border-solid border-gray03 rounded-[10px] my-5">
            <input
              type="text"
              name=""
              id=""
              className="w-full h-[53px] rounded-[10px] px-6 focus:outline-none"
            />
            <img src={search} alt="검색 아이콘" className="mr-6" />
          </div>
          {tab ? (
            <>
              <ReportTable
                headers={processedHeader}
                bodys={paginatedProcessedBody}
                unHeaders={[]}
                unBodys={[]}
                check={check}
                onCheck={setCheck}
                recover={recover}
                onRecover={setRecover}
                process={process}
                onProcess={setProcess}
                edit={edit}
                onEdit={setEdit}
              />
              <Pagination
                totalPages={processedTotalPages}
                currentPage={processedCurrentPage}
                onPageChange={handleProcessedPageChange}
              />
            </>
          ) : (
            <>
              <ReportTable
                headers={[]}
                bodys={[]}
                unHeaders={unProcessedHeader}
                unBodys={paginatedUnProcessedBody}
                check={check}
                onCheck={setCheck}
                recover={recover}
                onRecover={setRecover}
                process={process}
                onProcess={setProcess}
                edit={edit}
                onEdit={setEdit}
              />
              <Pagination
                totalPages={unProcessedTotalPages}
                currentPage={unProcessedCurrentPage}
                onPageChange={handleUnProcessedPageChange}
              />
            </>
          )}
        </div>
      </div>
      {check && <Modal onCheck={setCheck} check={check} modalType={"check"} />}
      {recover && (
        <Modal onRecover={setRecover} recover={recover} modalType={"recover"} />
      )}
      {process && (
        <Modal onProcess={setProcess} process={process} modalType={"process"} />
      )}
      {edit && <Modal onEdit={setEdit} edit={edit} modalType={"edit"} />}
    </>
  );
}
