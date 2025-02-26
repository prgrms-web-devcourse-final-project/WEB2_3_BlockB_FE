import { useEffect, useState } from "react";
import FilterButton from "../components/admin/FilterButton";
import search from "../assets/icons/search-black.svg";
import ReportTable from "../components/admin/ReportTable";
import Modal from "../components/admin/Modal";
import Pagination from "../components/common/Pagenation";
import { usePagination } from "../hooks/usePagenation";
import {
  processedFilters,
  processedHeader,
  unprocessedFilters,
  unprocessedHeader,
} from "../constants/index";
import { adminAPI } from "../api/admin";

export default function Admin() {
  const [tab, setTab] = useState<"미처리" | "처리 완료">("미처리");
  const [selectedReasonFilter, setSelectedReasonFilter] = useState("all");
  const [selectedResultFilter, setSelectedResultFilter] = useState("all")

  const [check, setCheck] = useState(false);
  const [recover, setRecover] = useState(false);
  const [isProccessed, setIsProcessed] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // 테이블 바디
  const [processedBody, setProcessedBody] = useState<Report[]>([]);
  const [unProcessedBody, setUnprocessedBody] = useState<Report[]>([]);

  // 처리 여부에 따른 필터링
  const filterProcessStatus = (reports: Report[], tab: "미처리" | "처리 완료") => {
    return reports.filter((post) => post.status === tab);
  };

  // 미처리 신고 내역
  const fetchUnprocessedBody = async () => {
    if (selectedReasonFilter === "all") {
      const allReportsResponse = await adminAPI.fetchReports({});
      const allUnprocessedReports = filterProcessStatus(allReportsResponse.data.content, "미처리");
      setUnprocessedBody(allUnprocessedReports);
    } else {
      const reportsFilteredByReason = await adminAPI.fetchReports({ type: selectedReasonFilter });
      const reportsFilteredByStatus = filterProcessStatus(reportsFilteredByReason.data.content, "미처리");
      setUnprocessedBody(reportsFilteredByStatus);
    }
  };

  // 처리 완료된 신고 내역
  const fetchProcessedBody = async () => {
    if (selectedResultFilter === "all") {
      const allReportsResponse = await adminAPI.fetchReports({});
      const allProcessedReports = filterProcessStatus(allReportsResponse.data.content, "처리 완료");
      setProcessedBody(allProcessedReports);
    } else {
      const reportsFilteredByResult = await adminAPI.fetchReports({ result: selectedResultFilter });
      const reportsFilteredByStatus = filterProcessStatus(reportsFilteredByResult.data.content, "처리 완료");
      setProcessedBody(reportsFilteredByStatus);
    }
  };


  useEffect(() => {
    if (tab === "미처리") fetchUnprocessedBody();
    if (tab === "처리 완료") fetchProcessedBody();
  }, [selectedReasonFilter, selectedResultFilter, tab]);


  useEffect(()=>{
    console.log("선택된 신고사유 필터",selectedReasonFilter)
    console.log("선택된 결과 필터",selectedResultFilter)
  },[selectedReasonFilter, selectedResultFilter])

  const itemsPerPage = 5;
  const {
    paginatedData: paginatedProcessedBody,
    currentPage: processedCurrentPage,
    totalPages: processedTotalPages,
    handlePageChange: handleProcessedPageChange,
  } = usePagination<Report>(processedBody, itemsPerPage);
  const {
    paginatedData: paginatedUnProcessedBody,
    currentPage: unProcessedCurrentPage,
    totalPages: unProcessedTotalPages,
    handlePageChange: handleUnProcessedPageChange,
  } = usePagination<Report>(unProcessedBody, itemsPerPage);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[980px] h-auto mt-[50px] pt-7 pl-7 pr-7">
          <p className="text-[24px] font-bold md:text-[32px]">신고 목록</p>
          <div className="flex border-b-[1px] border-gray03 border-solid text-[16px] font-bold my-5">
            <button
              onClick={() => setTab("미처리")}
              className={`${
                tab==="미처리"
                  ? "mr-4 border-b-2 border-solid border-blue01 text-blue03"
                  : "text-gray04"
              }`}
            >
              미처리
            </button>
            <button
              onClick={() => setTab("처리 완료")}
              className={`${
                tab === "미처리"
                  ? "text-gray04"
                  : "ml-4 border-b-2 border-solid border-blue01 text-blue03"
              }`}
            >
              처리 완료
            </button>
          </div>
          <div className="flex items-center">
            <p className="text-[14px] md:text-[16px] h-5 text-gray01 mr-6 whitespace-nowrap">
              {tab === "미처리" ? "신고 사유" : "처리 옵션"}
            </p>
            <div
              className={`${
                tab === "미처리" ? "w-[814px] " : "w-[375px]"
              } h-[40px] flex justify-between text-[14px]  overflow-x-auto  `}
            >
              {tab === "미처리"
                ? unprocessedFilters.map((filter) => (
                    <FilterButton
                      key={filter.value}
                      label={filter.label}
                      value={filter.value}
                      selected={selectedReasonFilter === filter.value}
                      setFilter={setSelectedReasonFilter}
                      width={filter.width}
                    />
                  ))
                : processedFilters.map((filter) => (
                    <FilterButton
                      key={filter.value}
                      label={filter.label}
                      value={filter.value}
                      selected={selectedResultFilter === filter.value}
                      setFilter={setSelectedResultFilter}
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
          {tab === "미처리" ? (
            <>
              <ReportTable
                headers={[]}
                bodys={[]}
                unHeaders={unprocessedHeader}
                unBodys={paginatedUnProcessedBody}
                check={check}
                onCheck={setCheck}
                recover={recover}
                onRecover={setRecover}
                isProcessed={isProccessed}
                onProcess={setIsProcessed}
                isEdited={isEdited}
                onEdit={setIsEdited}
              />
              <Pagination
                totalPages={unProcessedTotalPages}
                currentPage={unProcessedCurrentPage}
                onPageChange={handleProcessedPageChange}
              />
            </>
          ) : (
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
                isProcessed={isProccessed}
                onProcess={setIsProcessed}
                isEdited={isEdited}
                onEdit={setIsEdited}
              />
              <Pagination
                totalPages={processedTotalPages}
                currentPage={processedCurrentPage}
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
      {isProccessed && (
        <Modal onProcess={setIsProcessed} process={isProccessed} modalType={"process"} />
      )}
      {isEdited && <Modal onEdit={setIsEdited} edit={isEdited} modalType={"edit"} />}
    </>
  )
}
