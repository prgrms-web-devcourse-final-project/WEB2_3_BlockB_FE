import ProfileCard from "./ProfileCard";

export default function ParticipantBox({
  label,
  labelAlignment,
  color,
  hasReportBtn = false,
}: {
  label: string;
  labelAlignment: string;
  color?: string;
  hasReportBtn?: boolean;
}) {
  return (
    <div className="w-[280px] font-jersey">
      <div className={`flex font-bold justify-${labelAlignment} mb-[10px]`}>
        <p
          className={`text-white text-[24px] ${
            color === "blue" && "text-shadow:_0px_1px_10px_rgb(0_96_240_/_1.00)"
          }`}
        >
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-[20px] text-[16px] text-black01 font-bold">
        {/* 프로필 카드 */}
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
      </div>
    </div>
  );
}
