export default function AudienceCard({
  profile,
  nickname,
}: {
  profile: string;
  nickname: string;
}) {
  return (
    <figure className="flex gap-[10px]">
      <img src={profile} />
      <figcaption>{nickname}</figcaption>
    </figure>
  );
}
