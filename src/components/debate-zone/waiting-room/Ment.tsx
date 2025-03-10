import { useState } from "react";
import { useInterval } from "../../../hooks/usInterval";

export default function Ment() {
  const [dots, setDots] = useState("");

  useInterval(() => {
    setDots((prev) => (prev.length === 3 ? "" : prev + "."));
  }, 500);

  return (
    <h3 className="text-white md:text-[18px] sm:text-[16px] text-[14px] font-bold w-full text-center z-10">
      디베이터를 매칭하고 있습니다{dots}
    </h3>
  );
}
