import duse from "../../assets/icons/duse.svg";
import lose from "../../assets/icons/lose.svg";
import profile from "../../assets/icons/profile-white.svg";
import win from "../../assets/icons/win.svg";

export default function ProfileCard({ color }: { color?: string }) {
  return (
    <div
      className={`flex w-[280px] h-auto px-[10px] py-[8px] bg-neutral-50/50 rounded-lg ${
        color === "blue" &&
        "bg-sky-950/50 shadow:0px 1px 10px rgb(0 96 240 /1.00) border border-neutral-50/50 text-white "
      }`}
      style={
        color === "blue"
          ? {
              textShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)",
              boxShadow: "0px 1px 10px rgba(0, 96, 240, 1.00)",
            }
          : {}
      }
    >
      <figure className="rounded-full mr-5">
        <img src={profile} alt="" className="w-[54px] h-[54px] " />
      </figure>
      <div className="flex flex-col">
        <p>imaria0218</p>
        <div className="flex gap-[10px]">
          <figure className="flex items-center rounded-full">
            <img src={win} alt="" className="w-[22px] h-[22px] mr-2" />
            <figcaption>5</figcaption>
          </figure>
          <figure className="flex items-center rounded-full">
            <img src={duse} alt="" className="w-[22px] h-[22px] mr-2" />
            <figcaption>3</figcaption>
          </figure>
          <figure className="flex items-center rounded-full">
            <img src={lose} alt="" className="w-[22px] h-[22px] mr-2" />
            <figcaption>0</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
