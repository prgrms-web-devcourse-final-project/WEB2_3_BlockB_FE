import { Link } from "react-router";

import like from "../../assets/icons/like.svg";
import bookmark from "../../assets/icons/bookmark.svg";

export default function NewsSimpleInfo({ data }: { data: NewsType }) {
  return (
    <Link to={`/news/${data.id}`}>
      <div className="w-[321px] h-[540px] max-lg:w-[369px] max-md:w-[320px]  max-md:h-[180px] flex flex-col justify-between font-pretendard hover:scale-[1.02]">
        <div className="max-md:flex max-md:gap-2 ">
          <img
            src={data.imgUrl}
            alt="썸네일"
            className="w-full h-[237px] rounded-[10px] max-md:w-[128px] max-md:h-[80px]"
          />
          <div className="flex flex-col justify-between ">
            <div className="text-[24px] font-extrabold max-md:text-[14px] line-clamp-2 max-md:line-clamp-3 md:mt-2">
              {data.title}
            </div>
            <div className="flex justify-between text-[16px] max-md:text-[10px]">
              <span>{data.newsType}</span>
              <span>{new Date(data.deliveryTime).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="text-[18px] max-md:text-[12px] line-clamp-6 max-md:line-clamp-4">
          {data.content}
        </div>

        <div className="flex justify-end ">
          <div className="flex w-24 justify-between text-[12px] max-md:text-[10px]">
            <div className="w-[41px] h-[15px] flex items-center justify-between">
              <img src={like} alt="좋아요" />
              <span>{data.like}</span>
            </div>
            <div className="w-[37px] h-[15px] flex items-center justify-between">
              <img src={bookmark} alt="북마크" />
              <span>{data.bookmark}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
