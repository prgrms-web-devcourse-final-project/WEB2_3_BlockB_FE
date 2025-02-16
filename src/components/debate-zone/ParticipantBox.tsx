import ProfileCard from "./ProfileCard";

export default function ParticipantBox({
  label,
  labelAlignment,
}: {
  label: string;
  labelAlignment: string;
}) {
  return (
    <div className="w-[280px]">
      <div className={`flex justify-${labelAlignment}`}>
        <p className="text-white text-[24px]">{label}</p>
      </div>
      <div className="flex flex-col gap-[20px] text-[16px] text-black01 font-bold">
        {/* 프로필 카드 */}
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
}
