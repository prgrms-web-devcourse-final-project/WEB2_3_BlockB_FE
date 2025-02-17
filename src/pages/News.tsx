import { useState } from "react";
import Category from "../components/news/category";
import { useNavigate } from "react-router-dom";
import search from "../assets/icons/search.svg";
// 뉴스 데이터 타입 정의
type NewsItem = {
  newsId: number;
  newsTitle: string;
  newsContent: string;
  newsImgUrl: string;
  newsType: string;
  deliveryTime: string;
};

export default function News() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<1 | 2>(1); // 1: 최신순, 2: 인기순

  // 더미 뉴스 데이터
  const [newsData, _] = useState<NewsItem[]>([
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
    {
      newsId: 1,
      newsTitle: "미국-인도 정상회담 개최",
      newsContent:
        "조 바이든 미국 대통령과 나렌드라 모디 인도 총리가 워싱턴 D.C.에서 정상회담을 갖고 경제 및 안보 협력 강화 방안을 논의했습니다.",
      newsImgUrl:
        "https://img0.yna.co.kr/photo/cms/2025/02/17/59/PCM20250217000059990_T2.jpg",
      newsType: "연합뉴스",
      deliveryTime: "2025-02-17T15:07:00Z",
    },
  ]);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto p-6 flex gap-12 relativ">
        {/* 메인 콘텐츠 영역 */}
        <div className="w-3/4">
          {/* 필터 버튼 */}
          <div className="flex space-x-6 text-lg font-semibold">
            <button
              className={`pb-2 ${
                status === 1
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
              onClick={() => {
                navigate(`/news`);
                setStatus(1);
              }}
            >
              최신순
            </button>
            <button
              className={`pb-2 ${
                status === 2
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400"
              }`}
              onClick={() => {
                navigate(`/news`);
                setStatus(2);
              }}
            >
              인기순
            </button>
          </div>

          {/* 검색 바 */}
          <div className="relative mt-3 w-full">
            <input
              type="text"
              className="border rounded-lg px-2 py-2 w-full pl-3 pr-10"
              placeholder="검색..."
            />
            <img
              src={search}
              alt="검색 아이콘"
              className="absolute right-3 top-3 w-5 h-5 text-gray-500"
            />
          </div>

          {/* 뉴스 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {newsData.map((news) => (
              <div key={news.newsId} className="rounded-lg shadow-sm">
                <img
                  src={news.newsImgUrl}
                  alt="뉴스 이미지"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-extrabold mt-3 font-sofiaSans">
                  {news.newsTitle}
                </h3>
                <div className="text-gray-500 font-sofiaSans text-sm flex justify-between mt-2">
                  <p className="font-sofiaSans">{news.newsType}</p>
                  <p className="font-sofiaSans">
                    {new Date(news.deliveryTime).toLocaleString()}
                  </p>
                </div>
                <p className="mt-2 text-sm font-sofiaSans text-gray-700">
                  {news.newsContent}
                </p>
                <div className="flex justify-end items-center mt-3 text-gray-500 text-sm">
                  <div className="flex space-x-3 font-sofiaSans">
                    <img src={search} alt="검색 아이콘" className="w-5 h-5" />
                    <span>123</span>{" "}
                    <img src={search} alt="검색 아이콘" className="w-5 h-5" />
                    <span>12</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리  */}
        <div className="w-1/4 ml-6">
          <Category />
        </div>
      </div>
    </div>
  );
}
