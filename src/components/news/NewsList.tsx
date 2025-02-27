import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import bookmark from "../../assets/icons/bookmark.svg";
import connection from "../../assets/icons/connection.svg";
import like from "../../assets/icons/like.svg";
import TopButton from "../common/TopButton";

export default function NewsList({ newsData }: { newsData: NewsType[] }) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="relative h-screen overflow-auto">
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="rounded-lg cursor-pointer"
            onClick={() => navigate(`/news/${news.id}`)}
          >
            <img
              src={news.imgUrl}
              alt="뉴스 이미지"
              className="object-cover w-full h-48 rounded-lg"
            />
            <h3 className="mt-3 text-lg font-extrabold">{news.title}</h3>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <p>{news.newsType}</p>
              <p>{new Date(news.deliveryTime).toLocaleString()}</p>
            </div>
            <p className="mt-2 text-sm text-gray-700">{news.content}</p>
            <div className="flex items-center justify-end mt-3 text-sm text-gray-500">
              <div className="flex space-x-3">
                <img src={like} alt="좋아요" className="w-5 h-5" />
                <span className="w-6 h-4">{news.like}</span>
                <img src={bookmark} alt="북마크" className="w-5 h-5" />
                <span className="w-6 h-4">{news.bookmark}</span>
                <img src={connection} alt="커넥트" className="w-5 h-5" />
                <span className="w-6 h-4">12</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <TopButton scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
