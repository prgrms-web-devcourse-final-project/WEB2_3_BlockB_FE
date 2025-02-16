import progress from "../../../assets/icons/progress/progress-icon";

export default function ProgressIndicator({
  checkedStates,
}: {
  checkedStates: Record<string, boolean>;
}) {
  const checkImgClass = "w-6 h-6 bg-neutral-50 rounded-full";
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
      key: "participant",
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
      desPrefix: "토론시간",
    },
  ];

  return (
    <div className="w-96 h-20 px-4 py-2 bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
      <p className="w-full font-bold text-center">Generating A New Room</p>
      <div className="w-full flex justify-between">
        {checkImgs.map((item, index) => (
          <figure key={index} className={checkImgClass}>
            <img
              src={checkedStates[item.key] ? item.complete : item.origin}
              alt={`${item.desPrefix} 입력완료`}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
