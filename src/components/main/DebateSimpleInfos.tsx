import { useEffect, useState } from "react";

import DebateSimpleInfo from "./DebateSimpleInfo";
import { DebateSimpleInfosSkeleton } from "../common/skeleton/main/DebateSimpleInfosSkeleton";

export default function DebateSimpleInfos({
  tab,
  datas,
}: {
  tab: boolean;
  datas: number[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className={`${tab ? "hidden" : "flex flex-col "}`}>
      {isLoading ? (
        <DebateSimpleInfosSkeleton count={datas.length || 5} />
      ) : (
        datas.map((_, index) => (
          <DebateSimpleInfo index={index + 1} key={index} />
        ))
      )}
    </div>
  );
}
