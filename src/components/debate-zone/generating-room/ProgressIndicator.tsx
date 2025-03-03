import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import progress from "../../../assets/icons/progress/progress-icon";

export default function ProgressIndicator({
  checkedStates,
}: {
  checkedStates: Record<string, boolean>;
}) {
  const checkImgClass = "w-6 h-6 bg-neutral-50 rounded-full relative";
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const [prevCheckedStates, setPrevCheckedStates] = useState(checkedStates);

  const checkImgs = [
    {
      key: "title",
      origin: progress.title,
      complete: progress.titleChecked,
      desPrefix: "주제",
    },
    {
      key: "description",
      origin: progress.description,
      complete: progress.descriptionChecked,
      desPrefix: "방 설명",
    },
    {
      key: "continent",
      origin: progress.continent,
      complete: progress.continentChecked,
      desPrefix: "대륙",
    },
    {
      key: "category",
      origin: progress.category,
      complete: progress.categoryChecked,
      desPrefix: "카테고리",
    },
    {
      key: "memberNumber",
      origin: progress.participant,
      complete: progress.participantChecked,
      desPrefix: "참가인원",
    },
    {
      key: "stance",
      origin: progress.stance,
      complete: progress.stanceChecked,
      desPrefix: "입장",
    },
    {
      key: "hasVote",
      origin: progress.hasVote,
      complete: progress.hasVoteChecked,
      desPrefix: "승패여부",
    },
    {
      key: "time",
      origin: progress.time,
      complete: progress.timeChecked,
      desPrefix: "발언 시간",
    },
    {
      key: "speakCount",
      origin: progress.turn,
      complete: progress.turnChecked,
      desPrefix: "발언 횟수",
    },
  ];

  useEffect(() => {
    Object.keys(checkedStates).forEach((key) => {
      const img = imgRefs.current[key];

      if (img && !prevCheckedStates[key] && checkedStates[key]) {
        gsap.fromTo(
          img,
          { opacity: 0, rotateY: 180 },
          { opacity: 1, rotateY: 0, duration: 0.4, ease: "power2.inOut" }
        );
      }
    });

    setPrevCheckedStates(checkedStates);
  }, [checkedStates, prevCheckedStates]);

  return (
    <div className="w-90 md:w-96 h-18 md:h-20 px-4 py-2 bg-white rounded-lg flex-col justify-center items-center gap-2.5 inline-flex mb-4">
      <p className="w-full font-bold text-center">Generating A New Room</p>
      <div className="w-full flex justify-between gap-1">
        {checkImgs.map((item, index) => (
          <figure key={index} className={checkImgClass}>
            <img
              ref={(el) => {
                imgRefs.current[item.key] = el;
              }}
              src={checkedStates[item.key] ? item.complete : item.origin}
              alt={`${item.desPrefix} 입력완료`}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
