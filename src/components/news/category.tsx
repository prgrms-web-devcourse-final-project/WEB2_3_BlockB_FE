import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "전체보기", path: "/news/?category=all" },
    {
      name: "북미",
      path: "/news",
    },
    { name: "남미", path: "/news" },
    { name: "아시아", path: "/news" },
    {
      name: "유럽",
      path: "/news",
    },
    { name: "아프리카", path: "/news" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full border text-gray-400 rounded-md p-4 text-left">
      <div className="text-blue-700 font-bold text-lg p-2 font-sofiaSans">
        카테고리
      </div>
      {categories.map((category) => (
        <div
          key={category.path}
          className="p-2 text-gray-500 font-bold font-sofiaSans hover:cursor-pointer hover:text-black transition-colors"
          onClick={() => handleNavigate(category.path)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Category;
