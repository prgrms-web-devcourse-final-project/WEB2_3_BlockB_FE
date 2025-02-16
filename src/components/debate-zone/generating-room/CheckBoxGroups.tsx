import {
  categoryChecklist,
  continentChecklist,
  hasVoteChecklist,
  participantChecklist,
  stanceChecklist,
  timeChecklist,
} from "../../../constants";

import { useState } from "react";
import CheckBoxGroup from "./CheckBoxGroup";

export default function CheckBoxGroups({
  genertingType,
  setCheckedStates,
}: {
  genertingType: string;
  setCheckedStates: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  // 체크 핸들러
  const updateProgress = (key: string) => {
    setCheckedStates((prev) => ({
      ...prev,
      [key]: true, // 체크 상태 토글
    }));
  };

  // 체크리스트 상태
  const [selectedContinent, setSelectedContinent] =
    useState(continentChecklist);
  const [selectedCategory, setSelectedCategory] = useState(categoryChecklist);
  const [selectedParticipant, setSelectedParticipant] =
    useState(participantChecklist);
  const [selectedStance, setSelectedStance] = useState(stanceChecklist);
  const [selectedHasVote, setSelectedHasVote] = useState(hasVoteChecklist);
  const [selectedTime, setSelectedTime] = useState(timeChecklist);

  const handleCheck = (
    list: ChecklistItem[],
    setList: React.Dispatch<React.SetStateAction<ChecklistItem[]>>,
    key: string
  ) => {
    const updatedList = list.map((item) => ({
      ...item,
      isChecked: item.key === key, // 선택한 항목만 true, 나머지는 false
    }));
    setList(updatedList);
  };

  return (
    <section className="w-full flex flex-col gap-[10px]">
      {genertingType === "fromDebateList" && (
        <CheckBoxGroup
          label="대륙"
          checklists={selectedContinent}
          onCheck={(key) => {
            handleCheck(selectedContinent, setSelectedContinent, key);
            updateProgress("continent");
          }}
        />
      )}
      <CheckBoxGroup
        label="카테고리"
        checklists={selectedCategory}
        onCheck={(key) => {
          handleCheck(selectedCategory, setSelectedCategory, key);
          updateProgress("category");
        }}
      />
      <CheckBoxGroup
        label="참가인원"
        checklists={selectedParticipant}
        onCheck={(key) => {
          handleCheck(selectedParticipant, setSelectedParticipant, key);
          updateProgress("participant");
        }}
      />
      <CheckBoxGroup
        label="입장"
        checklists={selectedStance}
        onCheck={(key) => {
          handleCheck(selectedStance, setSelectedStance, key);
          updateProgress("stance");
        }}
      />
      <CheckBoxGroup
        label="승패여부"
        checklists={selectedHasVote}
        onCheck={(key) => {
          handleCheck(selectedHasVote, setSelectedHasVote, key);
          updateProgress("hasVote");
        }}
      />
      <CheckBoxGroup
        label="토론시간"
        checklists={selectedTime}
        onCheck={(key) => {
          handleCheck(selectedTime, setSelectedTime, key);
          updateProgress("time");
        }}
      />
    </section>
  );
}
