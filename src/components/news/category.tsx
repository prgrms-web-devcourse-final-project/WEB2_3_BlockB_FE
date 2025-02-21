import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategorySkeleton from "../common/skeleton/news/CatecorySkeleton";

const Category = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: "전체보기", path: "/news/?category=all" },
    { name: "한국", path: "/news" },
    { name: "중국", path: "/news" },
    { name: "일본", path: "/news" },
    { name: "유럽", path: "/news" },
    { name: "아시아/호주", path: "/news" },
    { name: "미국/중남미", path: "/news" },
    { name: "아프리카/중동", path: "/news" },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (isLoading) return <CategorySkeleton />;

  return (
    <div className="w-full md:border text-gray-400 rounded-md md:p-4 text-left">
      <div className="text-blue03 font-extrabold text-lg md:p-2 mb-2 font-pretendard">
        카테고리
      </div>

      {/* PC 일때때 */}
      <div className="hidden md:block">
        {categories.map((category) => (
          <div
            key={category.path}
            className="p-2 text-gray-500 font-bold font-pretendard hover:cursor-pointer hover:text-blue03 transition-colors"
            onClick={() => handleNavigate(category.path)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* 모바일 일때 */}
      <div className="block md:hidden overflow-x-auto whitespace-nowrap scroll mb-5">
        <div className="flex gap-3">
          {categories.map((category) => (
            <div
              key={category.path}
              className="px-4 py-2 bg-gray-100 rounded-md text-gray-500 font-bold font-pretendard cursor-pointer hover:text-blue03 transition-colors"
              onClick={() => handleNavigate(category.path)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
