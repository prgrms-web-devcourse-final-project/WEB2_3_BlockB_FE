import ProfileCard from "./ProfileCard";

export default function ParticipantBox({
  label,
  labelAlignment = "center",
  color,
  hasReportBtn = false,
}: {
  label: string;
  labelAlignment?: string;
  color?: string;
  hasReportBtn?: boolean;
}) {
  return (
    <div className="md:w-[280px] w-[150px] font-jersey">
      <div className={`flex justify-${labelAlignment} mb-[10px]`}>
        <p
          className="text-white md:text-[24px] sm:text-[18px] text-[16px] "
          style={
            color === "blue"
              ? { textShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)" }
              : {}
          }
        >
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-[20px] md:text-[16px] text-[12px] text-black01">
        {/* 프로필 카드 */}
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
      </div>
    </div>
  );
}
