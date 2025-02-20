import { useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";
import Pagination from "../common/Pagenation";
import { usePagination } from "../../hooks/usePagenation";

export default function DebateTab({ tab }: { tab: string }) {
  const [filter, setFilter] = useState(true);
  const arrs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const itemsPerPage = 6;

  const {
    paginatedData: paginatedBody,
    currentPage: currentPage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  } = usePagination(arrs, itemsPerPage);

  return (
    <div className={`${tab === "debate" ? "" : "hidden"}`}>
      <div className="flex text-[20px] mb-[30px] font-pretendard">
        <button
          onClick={() => {
            setFilter(true);
          }}
          className={`${
            filter
              ? "text-blue03 border-b-2 border-blue01 font-bold"
              : "text-gray03"
          } h-6 mr-[30px]`}
        >
          진행
        </button>
        <button
          onClick={() => {
            setFilter(false);
          }}
          className={`${
            filter
              ? "text-gray03"
              : "text-blue03 border-b-2 border-blue01 font-bold"
          } h-6`}
        >
          종료
        </button>
      </div>
      <div>
        {paginatedBody.map((arr) => (
          <CommonSimpleInfo newsOrDebate={false} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
