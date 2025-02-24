import mouse from "../assets/icons/mouse.svg";
import moveDown from "../assets/icons/move-down.svg";
import debateScreenshot from "../assets/images/debate screenshot.svg";
import newsTop10Screenshot from "../assets/images/news top10 screenshot.svg";
import debateTop10Screenshot from "../assets/images/debate top 10 screenshot.svg";
import observingZoneScreenshot from "../assets/images/observingzone screenshot.svg";
export default function Landing() {
  return (
    <div className="h-auto py-20 text-white bg-black01">
      <div className="flex sm:pl-16 max-sm:flex-col">
        <div className="flex max-md:justify-center">
          <div className="font-sofiaSans h-[673] flex flex-col justify-center">
            <p className="font-bold text-[60px] w-[460px] max-xl:text-[50px] max-lg:text-[40px] max-xl:w-[380px] max-lg:w-80  max-md:text-[30px] max-md:w-64 ">
              Sharing Thoughts Not Just Words
            </p>
            <p className="text-[40px] text-gray02 max-xl:text-[30px] max-md:text-[20px]">
              Think Deep, Speak Clear
            </p>
          </div>
        </div>
        <div className="flex max-md:justify-center">
          <div className="w-[1002px] max-xl:w-[750px] max-lg:w-[601px] max-md:w-[450px] max-sm:w-[320px] h-[673px] max-xl:h-[504px] max-lg:h-[404px] max-md:h-[300px] max-sm:h-[224px] relative ">
            <div className="w-full h-full bg-gradient-to-b from-[#0D1B35] to-[#02050B] rounded-[300px] flex justify-center items-center">
              <div className="w-[878px] max-xl:w-[658px] max-lg:w-[528px] max-md:w-[380px] max-sm:w-[280px] h-[621px] max-xl:h-[465px] max-lg:h-[372px] max-md:h-[270px] max-sm:h-[200px] bg-gradient-to-b from-[#132D5D] to-[#070F20] rounded-[300px] flex justify-center items-center">
                <div className="w-[768px] max-xl:w-[576px] max-lg:w-[462px] max-md:w-[330px] max-sm:w-[245px] h-[519px] max-xl:h-[389px] max-lg:h-[311px] max-md:h-[220px] max-sm:h-[160px] bg-gradient-to-b from-[#1B3E7E] to-[#0D1D3D] rounded-[300px] flex justify-center items-center">
                  <div className="w-[650px] max-xl:w-[488px] max-lg:w-[390px] max-md:w-[280px] max-sm:w-[210px] h-[420px] max-xl:h-[315px] max-lg:h-[252px] max-md:h-[180px] max-sm:h-[128px] bg-gradient-to-b from-[#4E87E0] to-blue01 rounded-[300px] flex justify-center items-center">
                    <div className="w-[545px] max-xl:w-[409px] max-lg:w-[327px] max-md:w-[240px] max-sm:w-[176px] h-[332px] max-xl:h-[249px] max-lg:h-[200px] max-md:h-[150px] max-sm:h-[100px] bg-gradient-to-b from-[#639DF7] to-[#1E5BB8] rounded-[300px] flex justify-center items-center">
                      <div className="w-[414px] max-xl:w-[311px] max-lg:w-[249px] max-md:w-[190px] max-sm:w-[140px] h-[238px] max-xl:h-[178px] max-lg:h-[143px] max-md:h-[110px] max-sm:h-[72px] bg-gradient-to-b from-blue09 to-game_blue01 rounded-[300px] flex justify-center items-center">
                        <div className="w-[308px] max-xl:w-[231px] max-lg:w-[185px] max-md:w-[140px] max-sm:w-[100px] h-[138px] max-xl:h-[104px] max-lg:h-[83px] max-md:h-[65px] max-sm:h-[52px] bg-gradient-to-b from-[#BDD5FF] to-[#5A98F7] rounded-[300px] flex justify-center items-center"></div>
                        <button className="absolute z-20 w-[203px] max-xl:w-[152px] max-lg:w-[122px] max-md:w-[100px] max-sm:w-[80px] h-[58px] max-xl:h-[44px] max-lg:h-[35px] max-md:h-[28px] max-sm:h-[24px] bg-white text-black text-[18px] max-xl:text-[14px] max-lg:text-[12px] max-md:text-[11px] max-sm:text-[10px] font-bold font-pretendard flex justify-center items-center rounded-[300px]">
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
      <div className="flex flex-col items-center  text-[20px] ">
        <div className="relative flex w-11 h-9">
          <img src={mouse} alt="마우스 아이콘" className="absoulte w-9 h-9" />
          <img
            src={moveDown}
            alt="화살표 아래 아이콘"
            className="absolute w-6 h-6 mt-2 ml-6 animate-bounce"
          />
        </div>
        <p>scroll and browser</p>
        <p>our services</p>
      </div>

      <div className="flex flex-col items-center my-20">
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Debate
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            원하는 주제와 타입의 토론방을 개설하고 사람들과 의견을 나눌 수
            있습니다
          </p>
        </div>
        <img
          src={debateScreenshot}
          alt="토론 스크린샷"
          className="max-lg:w-[768px] max-md:w-[640px] max-sm:w-80"
        />
      </div>

      <div className="flex flex-col items-center my-20 ">
        <div className="w-[914px] mb-20 flex items-end flex-col max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Observe
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            토론을 관전하며 참관자들과 실시간으로 의견을 나눌 수 있습니다
          </p>
        </div>
        <img
          src={observingZoneScreenshot}
          alt="참관 스크린샷"
          className="max-lg:w-[768px] max-md:w-[640px] max-sm:w-80"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[914px] mb-20 max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <p className="font-sofiaSans font-bold text-[60px] max-md:text-[40px] max-sm:text-[20px]">
            Connect
          </p>
          <p className="font-pretendard text-[20px] max-md:text-[16px] max-sm:text-[12px]">
            실시간 뉴스를 열람하고 뉴스페이지에서 손쉽게 토론방을 개설할 수
            있습니다
          </p>
        </div>
        <div className="flex w-[914px] justify-between max-lg:w-[768px] max-md:w-[640px] max-sm:w-80">
          <img
            src={newsTop10Screenshot}
            alt="인기 뉴스 리스트 스크린샷"
            className="max-lg:w-[352px] max-md:w-[304px] max-sm:w-[150px]"
          />
          <img
            src={debateTop10Screenshot}
            alt="인기 토론방 리스트 스크린샷"
            className="max-lg:w-[352px] max-md:w-[304px] max-sm:w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
