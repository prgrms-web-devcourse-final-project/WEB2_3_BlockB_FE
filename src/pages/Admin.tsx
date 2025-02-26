import { useEffect, useRef, useState } from "react";
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
import { adminAPI } from "../api/admin";

export default function Admin() {
  const [tab, setTab] = useState("미처리");
  const [reason, setReason] = useState("all");

  const [check, setCheck] = useState(false);
  const [recover, setRecover] = useState(false);
  const [isProccessed, setIsProcessed] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [allPosts, setAllPosts] = useState<Report[]>([])
  const [processedBody, setProssedBody] = useState<Report[] >([])
  const [unProcessedBody, setUnprossedBody] = useState<Report[] >([])

  useEffect(()=>{
    const loadReports = async () => {
      const reportsResponse = await adminAPI.fetchReports({})
      console.log(reportsResponse.data.content)
      setAllPosts(reportsResponse.data.content)
    }

    loadReports()
  },[])

  useEffect(()=>{
    if(!allPosts) return
     if(tab === "처리" ) {
       const filteredProcessedBody = allPosts.filter((post) => post.status === "처리완료")
       setProssedBody(allPosts)
     }
     if(tab === "미처리") {
       const filteredUnprocessedBody = allPosts.filter((post) => post.status === "미처리")
       setProssedBody(allPosts)
     }
     
   },[reason, tab])




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
              onClick={() => setTab("처리")}
              className={`${
                tab === "미처리"
                  ? "text-gray04"
                  : "ml-4 border-b-2 border-solid border-blue01 text-blue03"
              }`}
            >
              처리
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
          {tab === "미처리" ? (
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
                isProcessed={isProccessed}
                onProcess={setIsProcessed}
                isEdited={isEdited}
                onEdit={setIsEdited}
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
      {isProccessed && (
        <Modal onProcess={setIsProcessed} process={isProccessed} modalType={"process"} />
      )}
      {isEdited && <Modal onEdit={setIsEdited} edit={isEdited} modalType={"edit"} />}
    </>
  );
}
