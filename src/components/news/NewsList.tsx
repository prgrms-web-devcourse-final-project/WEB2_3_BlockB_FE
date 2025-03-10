import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import bookmark from "../../assets/icons/bookmark.svg";
import like from "../../assets/icons/like.svg";
import TopButton from "../common/TopButton";

export default function NewsList({
  newsData,
  loadMore,
  hasMore,
}: {
  newsData: NewsType[];
  loadMore: () => void;
  hasMore: boolean;
}) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="relative h-screen overflow-auto">
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-[10px] transform transition duration-200 hover:scale-[1.002]"
            onClick={() => navigate(`/news/${news.id}`)}
          >
            <img
              src={news.imgUrl}
              alt="뉴스 이미지"
              className="object-cover w-full h-48 rounded-lg"
            />
            <h3 className="mt-3 text-lg font-extrabold lg:h-[74px] h-[102px]">
              {news.title}
            </h3>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <p>{news.newsType}</p>
              <p>{new Date(news.deliveryTime).toLocaleString()}</p>
            </div>
            <p className="mt-2 text-sm text-gray-700 md:h-[180px] sm:h-[200px] h-[160px] overflow-hidden break-words pb-2">
              {news.content}
            </p>
            <div className="flex items-center justify-end mt-3 text-sm text-gray-500">
              <div className="flex space-x-3">
                <img src={like} alt="좋아요" className="w-5 h-5" />
                <span className="w-6 h-4">{news.like}</span>
                <img src={bookmark} alt="북마크" className="w-5 h-5" />
                <span className="w-6 h-4">{news.bookmark}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TopButton scrollContainerRef={scrollContainerRef} />

      {hasMore && (
        <div className="flex items-center justify-center w-full h-20 mt-10">
          <button
            className="border border-gray02 text-gray01 border-solid rounded-lg w-40 text-[20px] font-sofiaSans bg-gray02  transform scale-105  transition-all duration-200 hover:scale-110 active:bg-white active:text-black01"
            onClick={loadMore}
          >
            show more
          </button>
        </div>
      )}
    </div>
  );
}
