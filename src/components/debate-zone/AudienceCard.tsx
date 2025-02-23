export default function AudienceCard({
  profile,
  nickname,
}: {
  profile: string;
  nickname: string;
}) {
  return (
    <figure className="flex gap-[10px] items-center">
      <img src={profile} className="md:w-[29px] md:h-[29px] w-[25px] h-[25px]"/>
      <figcaption className="md:text-[16px] text-[12px] font-jersey">{nickname}</figcaption>
    </figure>
  );
}
