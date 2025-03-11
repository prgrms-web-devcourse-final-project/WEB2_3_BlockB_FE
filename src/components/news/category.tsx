import { useNavigate, useSearchParams } from "react-router";

const Category = () => {
  const [serchParams] = useSearchParams();
  const continentCode = serchParams.get("continent");
  const navigate = useNavigate();
  const categories = [
    { name: "전체보기", code: "all" },
    { name: "한국", code: `KR` },
    { name: "중국", code: `CN` },
    { name: "일본", code: `JP` },
    { name: "유럽", code: `EU` },
    { name: "아시아/호주", code: `AS` },
    { name: "미국/중남미", code: `AM` },
    { name: "아프리카/중동", code: `AF` },
  ];

  return (
    <div className="w-full text-left text-gray-400 rounded-md md:border md:p-4">
      <div className="mb-2 text-lg font-extrabold text-blue03 md:p-2 font-pretendard">
        카테고리
      </div>

      {/* PC */}
      <div className="hidden md:block">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${
              continentCode === category.code ? "text-blue03" : "text-gray-500"
            } px-4 py-2 font-bold  transition-colors hover:bg-gray02 rounded-md cursor-pointer font-pretendard hover:text-blue03`}
            onClick={() => {
              navigate(`/news?continent=${category.code}`);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* 모바일 */}
      <div className="block mb-5 overflow-x-auto md:hidden whitespace-nowrap scroll">
        <div className="flex gap-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${
                continentCode === category.code
                  ? "text-blue03"
                  : "text-gray-500"
              } px-4 py-2 font-bold  transition-colors bg-gray-100 rounded-md cursor-pointer font-pretendard hover:text-blue03`}
              onClick={() => {
                navigate(`/news?continent=${category.code}`);
              }}
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
