import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { gsap } from "gsap";

export default function LandingWaveAnimation() {
  const navigate = useNavigate();
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      const divs = animationRef.current.querySelectorAll("div");

      gsap.fromTo(
        divs,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.065,
        }
      );
    }
  }, []);

  return (
    <div className="flex max-md:justify-center">
      <div
        ref={animationRef}
        className="w-[1002px] max-xl:w-[750px] max-lg:w-[601px] max-md:w-[450px] max-sm:w-[320px] h-[673px] max-xl:h-[504px] max-lg:h-[404px] max-md:h-[300px] max-sm:h-[224px] relative"
      >
        <div className="w-full h-full bg-gradient-to-b from-[#0D1B35] to-[#02050B] rounded-[300px] flex justify-center items-center">
          <div className="w-[878px] max-xl:w-[658px] max-lg:w-[528px] max-md:w-[380px] max-sm:w-[280px] h-[621px] max-xl:h-[465px] max-lg:h-[372px] max-md:h-[270px] max-sm:h-[200px] bg-gradient-to-b from-[#132D5D] to-[#070F20] rounded-[300px] flex justify-center items-center">
            <div className="w-[768px] max-xl:w-[576px] max-lg:w-[462px] max-md:w-[330px] max-sm:w-[245px] h-[519px] max-xl:h-[389px] max-lg:h-[311px] max-md:h-[220px] max-sm:h-[160px] bg-gradient-to-b from-[#1B3E7E] to-[#0D1D3D] rounded-[300px] flex justify-center items-center">
              <div className="w-[650px] max-xl:w-[488px] max-lg:w-[390px] max-md:w-[280px] max-sm:w-[210px] h-[420px] max-xl:h-[315px] max-lg:h-[252px] max-md:h-[180px] max-sm:h-[128px] bg-gradient-to-b from-[#4E87E0] to-blue01 rounded-[300px] flex justify-center items-center">
                <div className="w-[545px] max-xl:w-[409px] max-lg:w-[327px] max-md:w-[240px] max-sm:w-[176px] h-[332px] max-xl:h-[249px] max-lg:h-[200px] max-md:h-[150px] max-sm:h-[100px] bg-gradient-to-b from-[#639DF7] to-[#1E5BB8] rounded-[300px] flex justify-center items-center">
                  <div className="w-[414px] max-xl:w-[311px] max-lg:w-[249px] max-md:w-[190px] max-sm:w-[140px] h-[238px] max-xl:h-[178px] max-lg:h-[143px] max-md:h-[110px] max-sm:h-[72px] bg-gradient-to-b from-blue09 to-game_blue01 rounded-[300px] flex justify-center items-center">
                    <div className="w-[308px] max-xl:w-[231px] max-lg:w-[185px] max-md:w-[140px] max-sm:w-[100px] h-[138px] max-xl:h-[104px] max-lg:h-[83px] max-md:h-[65px] max-sm:h-[52px] bg-gradient-to-b from-[#BDD5FF] to-[#5A98F7] rounded-[300px] flex justify-center items-center"></div>
                    <button
                      className="absolute z-20 w-[203px] max-xl:w-[152px] max-lg:w-[122px] max-md:w-[100px] max-sm:w-[80px] h-[58px] max-xl:h-[44px] max-lg:h-[35px] max-md:h-[28px] max-sm:h-[24px] bg-white text-black text-[18px] max-xl:text-[14px] max-lg:text-[12px] max-md:text-[11px] max-sm:text-[10px] font-bold font-pretendard flex justify-center items-center rounded-[300px]"
                      onClick={() => navigate("/login")}
                    >
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
  );
}
