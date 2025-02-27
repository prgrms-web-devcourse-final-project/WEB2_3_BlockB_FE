import { useEffect, useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";
import Pagination from "../common/Pagenation";
import { usePagination } from "../../hooks/usePagenation";
import { userApi } from "../../api/user";

export default function DebateTab({ tab, user }: { tab: string, user: UserInfo | null }) {
  const [isEnd, setEnd] = useState<boolean>(false);
  const [myDebates, setMyDebates] = useState<ArchivedDebate[]>([])

  useEffect(()=>{
      if (!user) return 
      const loadDebateList = async () => {
        const myDebateResponse = await userApi.fetchArchivedDebateList(user.id)
        setMyDebates(myDebateResponse.data.filter((debate: ArchivedDebate)=> isEnd ? debate.status === "CLOSED" : debate.status === "DEBATE"))
      }
      loadDebateList()
    },[tab, user, isEnd])


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
        <div className="flex text-[20px] mb-[30px] font-pretendard">
          <button
            onClick={() => {
              setEnd(false);
            }}
            className={`${
              isEnd ? "text-gray03"
              : "text-blue03 border-b-2 border-blue01 font-bold"

            } h-6 mr-[30px]`}
          >
            진행
          </button>
          <button
            onClick={() => {
              setEnd(true);
            }}
            className={`${
              isEnd ? "text-blue03 border-b-2 border-blue01 font-bold"
              : "text-gray03"
            } h-6`}
          >
            종료
          </button>
        </div>
        <div>
          {paginatedBody.map((debate) => (
            <CommonSimpleInfo type="debate" data={debate} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
