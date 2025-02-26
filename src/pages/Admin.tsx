import { useEffect, useState } from "react";
import search from "../assets/icons/search-black.svg";
import ReportTable from "../components/admin/ReportTable";
import Modal from "../components/admin/Modal";
import Pagination from "../components/common/Pagenation";
import { usePagination } from "../hooks/usePagenation";
import {
  processedHeader,
  unprocessedHeader,
} from "../constants/index";
import { adminAPI } from "../api/admin";
import useDebounce from "../hooks/useDebounce";
import AdminTab from "../components/admin/AdminTab";
import AdminFilteringButtons from "../components/admin/AdminFilteringButtons";

export default function Admin() {
  const [tab, setTab] = useState<AdminTab>("미처리");
  const [selectedReasonFilter, setSelectedReasonFilter] = useState("all");
  const [selectedResultFilter, setSelectedResultFilter] = useState("all")
  const [searchKeyword, SetSearchKeyword] = useState<string>("")
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);


  const [isCheckModalOpen, setCheckModalOpen] = useState(false);
  const [isRecoverModal, setRecoverModalOpen] = useState(false);
  const [isProcessModalOpen, setProcessModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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

  // 탭 및 필터링 적용시 api 호출
  useEffect(() => {
    if (tab === "미처리") fetchUnprocessedBody();
    if (tab === "처리 완료") fetchProcessedBody();
  }, [selectedReasonFilter, selectedResultFilter, tab]);

  // 신고 내역 검색
  const searchReports = async(keyword: string) => {
      const searchResults = await adminAPI.fetchReports({query: keyword})
      if (tab === "미처리") setUnprocessedBody(filterProcessStatus(searchResults.data.content, tab))
      if (tab === "처리 완료") setProcessedBody(filterProcessStatus(searchResults.data.content, tab))

  }

  // 검색 디바운싱
  const debouncedSearchTerm = useDebounce(searchKeyword, 100); 
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchReports(searchKeyword)
    }
  }, [debouncedSearchTerm]);


  // 페이지네이션
  const itemsPerPage = 5;
  const {
    paginatedData: paginatedUnProcessedBody,
    currentPage: unProcessedCurrentPage,
    totalPages: unProcessedTotalPages,
    handlePageChange: handleUnProcessedPageChange,
  } = usePagination<Report>(unProcessedBody, itemsPerPage);
  const {
    paginatedData: paginatedProcessedBody,
    currentPage: processedCurrentPage,
    totalPages: processedTotalPages,
    handlePageChange: handleProcessedPageChange,
  } = usePagination<Report>(processedBody, itemsPerPage);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[980px] h-auto mt-[50px] pt-7 pl-7 pr-7">
          <p className="text-[24px] font-bold md:text-[32px]">신고 목록</p>
          <AdminTab tab={tab} setTab={setTab}/>
          <AdminFilteringButtons tab={tab} selectedReasonFilter={selectedReasonFilter} setSelectedReasonFilter={setSelectedReasonFilter} selectedResultFilter={selectedResultFilter} setSelectedResultFilter={setSelectedResultFilter}/>
          <div className="flex bg-white border border-solid border-gray03 rounded-[10px] my-5">
            <input
              type="text"
              id="reports-lists-search"
              className="w-full h-[53px] rounded-[10px] px-6 focus:outline-none md:text-16px] text-[14px]"
              placeholder="신고 대상자 이름으로 검색하세요"
              value={searchKeyword}
              onChange={(e)=>{SetSearchKeyword(e.target.value)}}
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
                setCheckModalOpen={(isOpen, reportId) => {
                  setCheckModalOpen(isOpen);
                  setSelectedReportId(reportId); 
                }}
                setRecoverModalOpen={(isOpen, reportId) => {
                  setRecoverModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
                setProcessModalOpen={(isOpen, reportId) => {
                  setProcessModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
                setEditModalOpen={(isOpen, reportId) => {
                  setEditModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
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
                setCheckModalOpen={(isOpen, reportId) => {
                  setCheckModalOpen(isOpen);
                  setSelectedReportId(reportId); 
                }}
                setRecoverModalOpen={(isOpen, reportId) => {
                  setRecoverModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
                setProcessModalOpen={(isOpen, reportId) => {
                  setProcessModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
                setEditModalOpen={(isOpen, reportId) => {
                  setEditModalOpen(isOpen);
                  setSelectedReportId(reportId);
                }}
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
      {isCheckModalOpen && <Modal onCheck={setCheckModalOpen} modalType="check" reportId={selectedReportId} />}
      {isRecoverModal && <Modal setRecoverModalOpen={setRecoverModalOpen} modalType="recover" reportId={selectedReportId} />}
      {isProcessModalOpen && <Modal setProcessModalOpen={setProcessModalOpen} modalType="process" reportId={selectedReportId} />}
      {isEditModalOpen && <Modal setEditModalOpen={setEditModalOpen} modalType="edit" reportId={selectedReportId} />}
    </>
  )
}
