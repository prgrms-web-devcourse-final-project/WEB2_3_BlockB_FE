import { useState } from "react";
import DebateSimpleInfos from "../components/main/DebateSimpleInfos";
import NewsSimpleInfos from "../components/main/NewsSimpleInfos";
import { date, day, month, year } from "../constants/index";

export default function Main() {
  const [tab, setTeab] = useState(true);

  return (
    <>
      <div className="flex justify-center text-black01 mb-[210px]">
        <div className="w-[1128px]">
          <div className="w-full h-[109px]  flex justify-between items-center mt-[30px] mb-[56px]">
            <div className="text-[90px] font-unifrakturCook">
              EarthTalk Daily
            </div>
            <div className="w-[200px] h-[109px] font-sofiaSans font-extrabold ">
              <div className="flex text-[60px] h-[64px] items-center justify-end  ">
                {date} {month}
              </div>
              <div className="flex text-[30px] h-[45px] justify-end">
                {day} {year}
              </div>
            </div>
          </div>
          <div className="flex text-[30px] font-sourceSerif4 font-extrabold">
            <button
              onClick={() => {
                setTeab(true);
              }}
              className={`${
                tab
                  ? "w-[317px] h-[49px] bg-blue03 text-white justify-center flex rounded-t-[50px] "
                  : "w-[317px] h-[49px] justify-center flex rounded-t-[50px] shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] "
              }`}
            >
              news top 10
            </button>
            <button
              onClick={() => {
                setTeab(false);
              }}
              className={`${
                tab
                  ? "w-[317px] h-[49px] justify-center flex rounded-t-[50px] shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] "
                  : "w-[317px] h-[49px] bg-blue03 text-white justify-center flex rounded-t-[50px] "
              }`}
            >
              debate top 10
            </button>
          </div>
          <div
            className={`h-[60px] my-[17px] flex items-center ${
              tab ? "justify-between" : "justify-end"
            }`}
          >
            <span
              className={`${
                tab ? "text-[40px] font-extrabold font-sourceSerif4 " : "hidden"
              }`}
            >
              Focus
            </span>
            <button className="w-[113px] h-[34px] bg-gray03 rounded-[10px] text-white">
              view more
            </button>
          </div>
          <NewsSimpleInfos dates={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} tab={tab} />

          <DebateSimpleInfos
            tab={tab}
            datas={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
        </div>
      </div>
    </>
  );
}
