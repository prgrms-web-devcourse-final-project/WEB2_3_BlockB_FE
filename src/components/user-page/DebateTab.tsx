import { useEffect, useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";
import Pagination from "../common/Pagenation";
import { usePagination } from "../../hooks/usePagenation";
import { userApi } from "../../api/user";

export default function DebateTab({ tab, user }: { tab: string, user: UserInfo | null }) {
  const [myDebates, setMyDebates] = useState<ArchivedDebate[]>([])

  useEffect(()=>{
      if (!user) return 
      const loadDebateList = async () => {
        const myDebateResponse = await userApi.fetchArchivedDebateList(user.id)
        setMyDebates(myDebateResponse.data.filter((debate: ArchivedDebate)=>  debate.status === "CLOSED"))
      }
      loadDebateList()
    },[tab, user])


  const itemsPerPage = 6;

  const {
    paginatedData: paginatedBody,
    currentPage: currentPage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  } = usePagination(myDebates, itemsPerPage);

  return (
    <div
      className={`${
        tab === "debate" ? "" : "hidden"
      } flex max-md:justify-center`}
    >
      <div className="w-full max-md:w-80">
        {paginatedBody.length > 0 ? <div>
          {paginatedBody.map((debate) => (
            <CommonSimpleInfo type="debate" data={debate} />
          ))}
        </div> : <div className="h-100 text-gray01">저장된 토론방이 없습니다</div>}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
