import DebateSimpleInfo from "./DebateSimpleInfo";

export default function DebateSimpleInfos({
  tab,
  datas,
}: {
  tab: boolean;
  datas: number[];
}) {
  return (
    <div className={`${tab ? "hidden" : "flex flex-col "}`}>
      {datas.map((_, index) => (
        <DebateSimpleInfo index={index + 1} key={index} />
      ))}
    </div>
  );
}
