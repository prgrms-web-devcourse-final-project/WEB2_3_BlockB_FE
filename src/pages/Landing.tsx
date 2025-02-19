import mouse from "../assets/icons/mouse.svg";
import debateScreenshot from "../assets/images/debate screenshot.svg";
import newsTop10Screenshot from "../assets/images/news top10 screenshot.svg";
import debateTop10Screenshot from "../assets/images/debate top 10 screenshot.svg";
export default function Landing() {
  return (
    <div className="h-auto py-20 text-white bg-black01">
      <div className="flex pl-16">
        <div className="font-sofiaSans h-[673] flex flex-col justify-center">
          <p className="font-bold text-[60px] w-[460px] ">
            Sharing Thoughts Not Just Words
          </p>
          <p className="text-[40px] text-gray02">Think Deep, Speak Clear</p>
        </div>

        <div className="w-[1002px] h-[673px]">
          <div className=" w-[1002px] h-[673px] bg-gradient-to-b from-[#0D1B35] to-[#02050B] rounded-[300px]  flex justify-center items-center  ">
            <div className="w-[878px] h-[621px] bg-gradient-to-b from-[#132D5D] to-[#070F20] rounded-[300px] flex justify-center items-center">
              <div className="w-[768px] h-[519px] bg-gradient-to-b from-[#1B3E7E] to-[#0D1D3D] rounded-[300px] flex justify-center items-center  ">
                <div className="w-[650px] h-[420px] bg-gradient-to-b from-[#4E87E0] to-blue01 rounded-[300px] flex justify-center items-center">
                  <div className="w-[545px] h-[332px] bg-gradient-to-b from-[#639DF7] to-[#1E5BB8] rounded-[300px] flex justify-center items-center">
                    <div className="w-[414px] h-[238px] bg-gradient-to-b  from-blue09 to-game_blue01 rounded-[300px] flex justify-center items-center">
                      <div className="w-[308px] h-[138px] bg-gradient-to-b from-[#BDD5FF] to-[#5A98F7] rounded-[300px] flex justify-center items-center">
                        <button className="w-[203px] h-[58px] bg-white text-black text-[18px] font-bold font-pretendard flex justify-center items-center rounded-[300px] ">
                          토론하러 가기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center  text-[20px]">
        <img src={mouse} alt="마우스 스크롤 아이콘" className="w-11 h-9" />
        <p>scroll and browser</p>
        <p>our services</p>
      </div>

      <div className="flex flex-col items-center my-20">
        <div className="w-[914px] mb-20">
          <p className="font-sofiaSans font-bold text-[60px]">connect</p>
          <p className="font-pretendard text-[20px]">
            원하는 주제와 타입의 토론방을 개설하고 사람들과 의견을 나눌 수
            있습니다
          </p>
        </div>
        <img src={debateScreenshot} alt="토론 스크린샷" />
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[914px] mb-20 flex items-end flex-col">
          <p className="font-sofiaSans font-bold text-[60px]">connect</p>
          <p className="font-pretendard text-[20px]">
            실시간 뉴스를 열람하고 뉴스페이지에서 손쉽게 토론방을 개설할 수
            있습니다
          </p>
        </div>
        <div className="flex w-[914px] justify-between">
          <img src={newsTop10Screenshot} alt="인기 뉴스 리스트 스크린샷" />
          <img src={debateTop10Screenshot} alt="인기 토론방 리스트 스크린샷" />
        </div>
      </div>
    </div>
  );
}
