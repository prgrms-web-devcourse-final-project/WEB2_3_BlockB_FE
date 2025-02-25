import { useState } from "react";
import { useInterval } from "../../../hooks/usInterval";

export default function Ment() {
  const [dots, setDots] = useState("");

  useInterval(() => {
    setDots((prev) => (prev.length === 3 ? "" : prev + "."));
    console.log(dots);
  }, 500);

  return (
    <h3 className="text-white md:text-2xl sm:text-[16px] text-[14px] font-bold w-full text-center">
      디베이터를 매칭하고 있습니다{dots}
    </h3>
  );
}
