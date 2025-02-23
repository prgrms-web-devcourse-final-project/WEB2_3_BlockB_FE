import InfoDrodown from "../InfoDrodown";

export default function ObserverMobileTab({isDebateTabed, setIsDebateTabed}: {isDebateTabed: boolean; setIsDebateTabed: (isTabed: boolean) => void}) {
  return (
    <section className="md:hidden flex gap-4 h-[24px] border-b border-gray01 items-center">
        <InfoDrodown />
        <div className="flex gap-2">
            <div onClick={() => setIsDebateTabed(true)} className={`px-[6px] ${isDebateTabed? "text-blue04 border-b border-blue04" : "text-gray02"}`}>토론</div>
            <div onClick={() => setIsDebateTabed(false)} className={`px-[6px] ${!isDebateTabed? "text-blue04 border-b border-blue04" : "text-gray02"}`}>참관</div>
        </div>
    </section>
  )
}
