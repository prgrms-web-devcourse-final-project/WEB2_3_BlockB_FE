import searchNone from "../../assets/icons/searchNone.svg";
export default function SearchResultNone({
  searchTerm,
}: {
  searchTerm: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center mt-10 ">
      <img src={searchNone} alt="검색 없을 때" className="w-12 h-12 mb-4" />
      <p className="text-gray-500 md:text-[16px] text-[12px]">
        <span className="font-semibold whitespace-nowrap">"{searchTerm}"</span>
        에 대한 유저 정보가 없습니다. ..(っ °Д °;)っ
      </p>
    </div>
  );
}
