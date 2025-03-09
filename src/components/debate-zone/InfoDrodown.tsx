import link from "../../assets/icons/link.svg";
import info from "../../assets/icons/info-btn.svg";
import { useEffect, useState } from "react";
import { debateRoomApi } from "../../api/debatezone";
import { useParams } from "react-router";
import { timeFormatter } from "../../utils/timeFormatter";
import { getKeyFromDbKey } from "../../constants";

export default function InfoDrodown() {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  // const { roomSettings } = useRoomStore(); 쓸지 안 쓸지 미정
  // {getKeyFromDbKey(roomSettings.participant!)}  일단 정보 가져오는 것은 constants에 저장된 이 함수로 형식을 변환하면 됨
  // const [prosNum, setProsNum] = useState<number>(0);
  // const [consNum, setConsNum] = useState<number>(0);
  // 찬성 반대 숫자 초기 세팅, 이것도 roomStore를 쓰면 사용하게 됨
  // useEffect(() => {
  //   if (roomSettings.stance === "pro") {
  //     setProsNum(1);
  //   } else {
  //     setConsNum(1);
  //   }
  // }, [roomSettings]);
  const [debateRoomInfo, setDebateRoomInfo] = useState<DebateRoomInfo | null>(null)

  const {roomId} = useParams()
  useEffect(()=> {
    const loadDebateInfo = async () => {
      if (roomId) {
        const debateRoomInfoResponse = await debateRoomApi.fetchOngoingRoomInfo(roomId)
        setDebateRoomInfo(debateRoomInfoResponse.data)
     }
    }
    loadDebateInfo()
  },[])
  return (
    <div className="flex gap-[10px] items-start z-40 relative">
      {/* 드롭다운전 */}
      <button onClick={() => setInfoOpen(!infoOpen)} className="z-50">
        <img
          src={info}
          alt="토론방 상세 정보 여닫기"
          className="md:w-[20px] md:w-[18px] md:h-[20px] md:w-[18px] w-[16px] h-[16px]"
        />
      </button>
      {infoOpen && (
        <div className="absolute md:left-10 md:w-[600px] w-[325px] left-6 h-auto py-[20px] px-[36px] md:bg-neutral-50/50 bg-white rounded-lg border border-white01  flex flex-col justify-between gap-[20px] md:shadow-[0px_1px_5px_0px_rgba(251,251,251,1.00)] z-50">
          {/* 주제 및 설명 */}
          <div className="md:text-white font-bold flex flex-col gap-[10px]">
            <h1 className="inline-flex justify-start">
              <span className="w-[71px] mr-[10px] md:text-white text-black01">
                토론 주제
              </span>
              <span className="md:text-white text-gray01">
                {debateRoomInfo?.title}
              </span>
            </h1>
            <h2 className="inline-flex justify-start">
              <span className="w-[71px] mr-[10px] md:text-white text-black01">
                방 설명
              </span>
              <span className="md:text-white text-gray01">
                {debateRoomInfo?.description}
              </span>
            </h2>
          </div>
          {/* 토론방 정보 */}
          <div className="flex justify-start flex-wrap gap-[10px] text-black01 font-bold">
            <div className="h-7 px-2.5 py-1 md:bg-neutral-50/70 border border-gray03 rounded-3xl justify-start items-center gap-2 inline-flex">
              <p>{getKeyFromDbKey(debateRoomInfo?.continentType!)}</p>
            </div>
            <div className="h-7 px-2.5 py-1 md:bg-neutral-50/70 rounded-3xl border border-gray03 justify-start items-center gap-2 inline-flex">
              <p>{getKeyFromDbKey(debateRoomInfo?.categoryType!)}</p>
            </div>
            <div className="h-7 px-2.5 py-1 md:bg-neutral-50/70 rounded-3xl border border-gray03 justify-start items-center gap-2 inline-flex">
              <p>{timeFormatter(debateRoomInfo?.speakCountType! * debateRoomInfo?.timeType!)}</p>
            </div>
            <div className="h-7 px-2.5 py-1 md:bg-neutral-50/70 rounded-3xl border border-gray03 justify-start items-center gap-2 inline-flex">
              <p>{debateRoomInfo?.memberNumberType} : {debateRoomInfo?.memberNumberType}</p>
            </div>
            <div className="h-7 px-2.5 py-1 md:bg-neutral-50/70 rounded-3xl border border-gray03 justify-start items-center gap-2 inline-flex">
              <p>승패 결정</p>
              {/* TODO:이에 대한 api 응답값 현재 부재. 백엔드 업데이트 시 추가 예정 */}
            </div>
          </div>
          {/* 링크 */}
          <div>
            <figure className="flex items-center w-full gap-2">
              <img src={link} alt="연관된 뉴스 링크" />
              <figcaption className="md:text-gray02 text-gray03  md:text-[10px] text-[8px] leading-0">
                https://www.yna.co.kr/view/AKR20250213094800004?section=politics/all&site=topnews01
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </div>
  );
}
