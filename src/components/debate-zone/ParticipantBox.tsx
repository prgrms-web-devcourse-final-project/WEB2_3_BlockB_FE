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
      <div className={`flex justify-${labelAlignment} mb-[10px]`}>
        <p
          className="text-white text-[24px] "
          style={
            color === "blue"
              ? { textShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)" }
              : {}
          }
        >
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-[20px] text-[16px] text-black01">
        {/* 프로필 카드 */}
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
      </div>
    </div>
  );
}
