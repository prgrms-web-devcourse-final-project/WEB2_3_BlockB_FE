import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "전체보기", path: "/news/?category=all" },
    {
      name: "한국",
      path: "/news",
    },
    { name: "중국", path: "/news" },
    { name: "일본", path: "/news" },
    {
      name: "유럽",
      path: "/news",
    },
    { name: "아시아/호주", path: "/news" },
    { name: "미국/중남미", path: "/news" },
    { name: "아프리카/중동", path: "/news" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full border text-gray-400 rounded-md p-4 text-left">
      <div className="text-blue03 font-extrabold text-lg p-2 font-pretendard">
        카테고리
      </div>
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
  );
};

export default Category;
