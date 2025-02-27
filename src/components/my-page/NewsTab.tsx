import { useEffect, useState } from "react";
import CommonSimpleInfo from "./CommonSimpleInfo";
import { usePagination } from "../../hooks/usePagenation";
import Pagination from "../common/Pagenation";
import { userApi } from "../../api/user";

export default function NewsTab({ tab, user }: { tab: string, user: UserInfo | null}) {
  const [filter, setFilter] = useState("marked");
  const [mynews, setmyNews] = useState<MyNews[]>([])
  const itemsPerPage = 6;

  useEffect(()=>{
    if (!user) return 
    else if (filter === "marked") {
      const loadMarkedNews = async () => {
        const markedNewsResponse = await userApi.fetchMarkedNews(user.id)
        setmyNews(markedNewsResponse.data)
      }
      loadMarkedNews()
    }
    else if (filter === "liked") {
      const loadLikedNews = async ()=> {
        const likedNewsResponse = await userApi.fetchLikedNews(user.id);
        setmyNews(likedNewsResponse.data)
      }
      loadLikedNews();
    }

  },[tab, user, filter])

  // useEffect(()=>{
  //   console.log("mynews", mynews)
  //   console.log("paginatedBody", paginatedBody)
  // },[mynews])
  

  const {
    paginatedData: paginatedBody,
    currentPage: currentPage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  } = usePagination(mynews, itemsPerPage);

  


  return (
    <div
      className={`${tab === "news" ? "" : "hidden"} flex max-md:justify-center`}
    >
      <div className="w-full max-md:w-80">
        <div className="flex text-[20px] mb-[30px] font-pretendard">
          <button
            onClick={() => {
              setFilter("marked");
            }}
            className={`${
              filter === "marked"
                ? "text-blue03 border-b-2 border-blue01 font-bold"
                : "text-gray03"
            } h-6 mr-[30px]`}
          >
            북마크
          </button>
          <button
            onClick={() => {
              setFilter("liked");
            }}
            className={`${
              filter === "liked"
                ? "text-blue03 border-b-2 border-blue01 font-bold"
                : "text-gray03"
            } h-6`}
          >
            좋아요
          </button>
        </div>
        <div>
          {paginatedBody.map((news, index) => (
            <CommonSimpleInfo key={index} type="news" data={news} />
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
