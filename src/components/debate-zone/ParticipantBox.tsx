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
    <div className="lg:w-[280px] w-[145px] font-jersey">
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
      <div className="flex flex-col md:gap-[20px] sm:gap-[10px] gap-[6px] lg:text-[16px] text-[12px] text-black01">
        {/* 프로필 카드 */}
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
        <ProfileCard color={color} hasReportBtn={hasReportBtn} />
      </div>
    </div>
  );
}
