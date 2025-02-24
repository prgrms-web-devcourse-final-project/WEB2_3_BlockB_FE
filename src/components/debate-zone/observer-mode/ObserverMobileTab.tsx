import InfoDrodown from "../InfoDrodown";

export default function ObserverMobileTab({ isDebateTabed, setIsDebateTabed }: { isDebateTabed: boolean; setIsDebateTabed: (isTabed: boolean) => void }) {
  return (
    <section className="md:hidden flex gap-4 h-[24px] border-b border-gray01 items-center">
      <InfoDrodown />
      <div className="relative flex gap-2">
        <div
          onClick={() => setIsDebateTabed(true)}
          className={`relative px-[6px] text-sm transition-all duration-300 ${
            isDebateTabed ? "text-blue04 font-bold" : "text-gray02"
          }`}
        >
          토론
          <span
            className={`absolute bottom-0 left-0 h-[2px] bg-blue04 transition-transform duration-300 ${
              isDebateTabed ? "w-full scale-x-100" : "w-full scale-x-0"
            }`}
            style={{ transformOrigin: "left" }}
          />
        </div>
        <div
          onClick={() => setIsDebateTabed(false)}
          className={`relative px-[6px] text-sm transition-all duration-300 ${
            !isDebateTabed ? "text-blue04 font-bold" : "text-gray02"
          }`}
        >
          참관
          <span
            className={`absolute bottom-0 left-0 h-[2px] bg-blue04 transition-transform duration-300 ${
              !isDebateTabed ? "w-full scale-x-100" : "w-full scale-x-0"
            }`}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
