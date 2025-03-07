import { useState, useEffect } from "react";
import Category from "../components/news/Category";
import bookmark from "../assets/icons/bookmark.svg";
import bookmarked from "../assets/icons/bookmarked.svg";
import like from "../assets/icons/like.svg";
import liked from "../assets/icons/liked.svg";
import speechBubble from "../assets/icons/speechBubble.svg";
import NewsDetailSkeleton from "../components/common/skeleton/news/NewsDetailSkeleton";
import { useNavigate, useParams } from "react-router";
import { newsAPI } from "../api/news";
import { useUserStore } from "../stores/userStore";

export default function NewsDetail() {
  const userId = useUserStore((state) => state.userId);
  const [isLoading, setIsLoading] = useState(true);
  let { newsId } = useParams();
  const [newsInfo, setNewsInfo] = useState<NewsDetailType>();

  const fetchNewsDetail = async () => {
    const newsDetail = await newsAPI.getNewsDetail(Number(newsId), userId!);
    setNewsInfo(newsDetail.data);
  };

  const postNewsLike = async () => {
    await newsAPI.postNewsLike(Number(newsId), userId!);
    await fetchNewsDetail();
  };
  const postNewsBookmark = async () => {
    await newsAPI.postNewsBookmark(Number(newsId), userId!);
    await fetchNewsDetail();
  };

  const deleteNewsLike = async () => {
    await newsAPI.deleteNewsLike(Number(newsId), userId!);
    await fetchNewsDetail();
  };
  const deleteNewsBookmark = async () => {
    await newsAPI.deleteNewsBookmark(Number(newsId), userId!);
    await fetchNewsDetail();
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    fetchNewsDetail();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen overflow-hidden font-pretendard">
      <div className="flex flex-col h-full p-6 mx-auto overflow-auto max-w-10xl md:flex-row md:pr-0 md:gap-6">
        <div className="order-1 w-full md:w-1/6 md:ml-3">
        {/* TODO: category 이동 */}
          <Category  />
        </div>
        <div className="order-2 w-full overflow-auto md:w-5/6 md:mr-3">
          {isLoading ? (
            <NewsDetailSkeleton />
          ) : (
            <>
              {/* 뉴스 본문 (iframe) */}
              <div className="w-full h-[500px] md:h-[650px]  bg-white">
                <iframe
                  src={newsInfo?.link}
                  className="w-full h-full border-none"
                  title="News Detail"
                />
              </div>

              {/* 구분선 */}
              <div className="my-6 border-t border-gray-300"></div>

              {/* 좋아요, 북마크, 커넥트 버튼 */}
              <div className="flex flex-col items-center justify-between gap-4 text-lg text-gray-600 md:flex-row">
                <div className="flex justify-between w-full md:w-auto md:space-x-6">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => {
                      if (newsInfo?.liked) {
                        deleteNewsLike();
                      } else {
                        postNewsLike();
                      }
                    }}
                  >
                    <img
                      src={newsInfo?.liked ? liked : like}
                      alt="좋아요"
                      className="w-6 h-6"
                    />
                    <span className="w-8 text-base text-center">
                      {newsInfo?.like}
                    </span>
                  </button>
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => {
                      if (newsInfo?.marked) {
                        deleteNewsBookmark();
                      } else {
                        postNewsBookmark();
                      }
                    }}
                  >
                    <img
                      src={newsInfo?.marked ? bookmarked : bookmark}
                      alt="북마크"
                      className="w-6 h-6"
                    />
                    <span className="w-8 text-base text-center">
                      {newsInfo?.mark}
                    </span>
                  </button>
                </div>

                {/* 토론방 */}
                <button
                  onClick={() =>
                    navigate(`/debate-zone/new-debate?id=${newsId}`)
                  }
                  className="flex items-center justify-center w-full px-4 py-2 text-white rounded-md md:w-auto bg-blue-950"
                >
                  토론방 개설
                  <span className="ml-2">
                    <img
                      src={speechBubble}
                      alt="말풍선"
                      className="w-5 h-5 mx-1"
                    />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
