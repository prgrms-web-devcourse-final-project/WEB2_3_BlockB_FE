import { useNavigate } from "react-router-dom";
import bookmark from "../../assets/icons/bookmark.svg";
import connection from "../../assets/icons/connection.svg";
import like from "../../assets/icons/like.svg";
type NewsItem = {
  newsId: number;
  newsTitle: string;
  newsContent: string;
  newsImgUrl: string;
  newsType: string;
  deliveryTime: string;
};

interface NewsListProps {
  newsData: NewsItem[];
}

export default function NewsList({ newsData }: NewsListProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {newsData.map((news) => (
        <div
          key={news.newsId}
          className="rounded-lg cursor-pointer"
          onClick={() => navigate(`/news/${news.newsId}`)}
        >
          <img
            src={news.newsImgUrl}
            alt="뉴스 이미지"
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-lg font-extrabold mt-3">{news.newsTitle}</h3>
          <div className="text-gray-500 text-sm flex justify-between mt-2">
            <p>{news.newsType}</p>
            <p>{new Date(news.deliveryTime).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-sm text-gray-700">{news.newsContent}</p>
          <div className="flex justify-end items-center mt-3 text-gray-500 text-sm">
            <div className="flex space-x-3">
              <img src={like} alt="좋아요" className="w-5 h-5" />
              <span className="w-6 h-4">123</span>
              <img src={bookmark} alt="북마크" className="w-5 h-5" />
              <span className="w-6 h-4">12</span>
              <img src={connection} alt="커넥트트" className="w-5 h-5" />
              <span className="w-6 h-4">12</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
