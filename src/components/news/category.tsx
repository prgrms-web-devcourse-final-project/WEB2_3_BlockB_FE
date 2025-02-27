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
    <div className="w-full text-left text-gray-400 rounded-md md:border md:p-4">
      <div className="mb-2 text-lg font-extrabold text-blue03 md:p-2 font-pretendard">
        카테고리
      </div>

      {/* PC 일때때 */}
      <div className="hidden md:block">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-2 font-bold text-gray-500 transition-colors font-pretendard hover:cursor-pointer hover:text-blue03"
            onClick={() => handleNavigate(category.path)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* 모바일 일때 */}
      <div className="block mb-5 overflow-x-auto md:hidden whitespace-nowrap scroll">
        <div className="flex gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-4 py-2 font-bold text-gray-500 transition-colors bg-gray-100 rounded-md cursor-pointer font-pretendard hover:text-blue03"
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
