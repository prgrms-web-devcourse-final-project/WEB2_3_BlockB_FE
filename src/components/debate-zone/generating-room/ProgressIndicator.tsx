import progress from "../../../assets/icons/progress/progress-icon";

export default function ProgressIndicator() {
  const checkImgClass = "w-6 h-6 bg-neutral-50 rounded-full";
  const checkImgs = [
    {
      origin: progress.title,
      complete: progress.titleChecked,
      desPrefix: "주제",
    },
    {
      origin: progress.description,
      complete: progress.descriptionChecked,
      desPrefix: "방 설명",
    },
    {
      origin: progress.continent,
      complete: progress.continentChecked,
      desPrefix: "대륙",
    },
    {
      origin: progress.category,
      complete: progress.categoryChecked,
      desPrefix: "카테고리",
    },
    {
      origin: progress.participant,
      complete: progress.participantChecked,
      desPrefix: "참가인원",
    },
    {
      origin: progress.stance,
      complete: progress.stanceChecked,
      desPrefix: "입장",
    },
    {
      origin: progress.hasVote,
      complete: progress.hasVoteChecked,
      desPrefix: "승패여부",
    },
    {
      origin: progress.time,
      complete: progress.timeChecked,
      desPrefix: "토론시간",
    },
  ];

  return (
    <div className="w-96 h-20 px-4 py-2 bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
      <p className="w-full font-bold text-center">Generating A New Room</p>
      <div className="w-full flex justify-between">
        {checkImgs.map((item, index) => (
          <figure key={index} className={checkImgClass}>
            <img src={item.complete} alt={`${item.desPrefix} 입력완료`} />
          </figure>
        ))}
      </div>
    </div>
  );
}
