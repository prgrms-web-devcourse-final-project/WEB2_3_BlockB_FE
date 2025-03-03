import { useEffect, useState } from "react";
import DebateSimpleInfos from "../components/main/DebateSimpleInfos";
import NewsSimpleInfos from "../components/main/NewsSimpleInfos";
import { date, day, month, year } from "../constants/index";
import { Link } from "react-router";
import { newsAPI } from "../api/news";

export default function Main() {
  const [tab, setTeab] = useState(true);
  const [newses, setNewses] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchNewsTop10 = async () => {
      try {
        const newsTop10Results = await newsAPI.getNewsTop10();
        await setIsLoading(false);
        setNewses(newsTop10Results.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNewsTop10();
  }, []);
  return (
    <>
      <div className="flex justify-center text-black01 md:mb-[210px] mb-[100px]">
        <div className="w-[1024px]  max-md:w-full ">
          <div className="flex justify-center">
            <div className="w-full h-[109px] max-lg:w-[768px] max-md:h-8  max-md:w-80 flex justify-between items-center mt-[30px] mb-[56px] max-md:mt-4 max-md:mb-5">
              <div className="text-[90px] font-unifrakturCook max-md:text-[30px] max-md:w-[400px] ">
                EarthTalk Daily
              </div>
              <div className="w-[200px] h-[109px] max-md:h-8 font-sofiaSans font-extrabold  ">
                <div className="flex text-[60px]  items-center justify-end  max-md:text-[20px]">
                  {date} {month}
                </div>
                <div className="flex text-[30px]  justify-end max-md:text-[10px]">
                  {day} {year}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-center max-lg:flex">
            <div className="flex text-[30px] font-sourceSerif4 font-extrabold max-lg:w-[768px] max-md:text-[12px] max-md:w-80 ">
              <button
                onClick={() => {
                  setTeab(true);
                }}
                className={`${
                  tab
                    ? "  bg-blue03 text-white "
                    : " shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] "
                } w-[317px] h-[49px] max-md:w-40 max-md:h-5 justify-center flex rounded-t-[50px]`}
              >
                news top 10
              </button>
              <button
                onClick={() => {
                  setTeab(false);
                }}
                className={`${
                  tab
                    ? " shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] "
                    : " bg-blue03 text-white "
                } w-[317px] h-[49px]  max-md:w-40 max-md:h-5 justify-center flex rounded-t-[50px]`}
              >
                debate top 10
              </button>
            </div>
          </div>

          <div className=" max-lg:flex max-lg:justify-center">
            <div
              className={`h-[60px] my-[17px] flex items-center max-lg:w-[768px] max-md:w-[320px] max-md:h-5  ${
                tab ? "justify-between" : "justify-end"
              }`}
            >
              <span
                className={`max-lg:text-[25px] max-md:text-[14px] ${
                  tab
                    ? "text-[40px] font-extrabold font-sourceSerif4 "
                    : "hidden"
                }`}
              >
                Focus
              </span>
              <Link
                to={tab ? "/news" : "/debate-rooms"}
                className="w-[112px] h-[34px] text-[20px] max-lg:text-[16px] max-md:text-[12px] max-md:w-[66px] max-md:h-[18px] bg-gray03 rounded-[10px] text-white justify-center items-center flex"
              >
                view more
              </Link>
            </div>
          </div>

          <NewsSimpleInfos datas={newses} tab={tab} isLoading={isLoading} />

          <DebateSimpleInfos
            tab={tab}
            datas={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
        </div>
      </div>
    </>
  );
}
