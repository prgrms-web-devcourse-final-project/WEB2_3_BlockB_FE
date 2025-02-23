import { useEffect, useState } from "react";
import {
  categoryChecklist,
  continentChecklist,
  hasVoteChecklist,
  participantChecklist,
  stanceChecklist,
  timeChecklist,
  turnChecklist,
} from "../../../constants";

import { useRoomStore } from "../../../stores/roomStateStore";
import CheckBoxGroup from "./CheckBoxGroup";

export default function CheckBoxGroups({
  generatingType,
  setCheckedStates,
}: {
  generatingType: string;
  setCheckedStates: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  // 체크박스 그룹 목록
  const checklistGroups: {
    key: keyof RoomSettings;
    label: string;
    list: ChecklistItem[];
  }[] = [
    { key: "continent", label: "대륙", list: continentChecklist },
    { key: "category", label: "카테고리", list: categoryChecklist },
    { key: "participant", label: "참가인원", list: participantChecklist },
    { key: "stance", label: "입장", list: stanceChecklist },
    { key: "hasVote", label: "승패여부", list: hasVoteChecklist },
    { key: "time", label: "발언시간", list: timeChecklist },
    { key: "turn", label: "발언횟수", list: turnChecklist },
  ];

  // 선택한 항목 관리
  const [selectedKeys, setSelectedKeys] = useState<Record<string, string>>({});
  const [caculatedTime, setCaculatedTime] = useState<number>(0);
  const { roomSettings, setRoomSettings } = useRoomStore();

  useEffect(() => {
    const time = roomSettings.time ? +roomSettings.time : 0;
    const turn = roomSettings.turn ? +roomSettings.turn : 0;
    setCaculatedTime(time * turn);
  }, [roomSettings.time, roomSettings.turn]);

  const handleCheck = (groupKey: keyof RoomSettings, key: string) => {
    const selectedItem = checklistGroups
      .find((group) => group.key === groupKey)
      ?.list.find((item) => item.key === key);

    if (selectedItem) {
      setSelectedKeys((prev) => ({
        ...prev,
        [groupKey]: key,
      }));
      setCheckedStates((prev) => ({
        ...prev,
        [groupKey]: true,
      }));

      setRoomSettings(groupKey, selectedItem.dbKey);
    }
  };

  return (
    <section className="w-full flex flex-col md:gap-[10px] gap-6">
      {checklistGroups.map(({ key, label, list }) => {
        if (generatingType === "fromDebateList" || key !== "continent") {
          return (
            <CheckBoxGroup
              key={key}
              label={label}
              checklists={list.map((item) => ({
                ...item,
                isChecked: selectedKeys[key] === item.key, // 체크 상태 관리
              }))}
              onCheck={(selectedKey) => handleCheck(key, selectedKey)}
            />
          );
        }
        return null;
      })}
      <p className="flex justify-end text-[10px] mt-[2px] text-white">
        <span className="mr-[10px]">총 소요시간 :</span>
        <span>{caculatedTime} 초</span>
      </p>
    </section>
  );
}
