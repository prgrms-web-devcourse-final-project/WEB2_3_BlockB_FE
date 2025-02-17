export const continentChecklist: ChecklistItem[] = [
  { dbKey: "africa", key: "아프리카", isChecked: false },
  { dbKey: "south_america", key: "남미", isChecked: false },
  { dbKey: "asia", key: "아시아", isChecked: false },
  { dbKey: "europe", key: "유럽", isChecked: false },
  { dbKey: "oceania", key: "오세아니아", isChecked: false },
];

export const categoryChecklist: ChecklistItem[] = [
  { dbKey: "politics", key: "정치", isChecked: false },
  { dbKey: "economy", key: "경제", isChecked: false },
  { dbKey: "society", key: "사회", isChecked: false },
  { dbKey: "culture", key: "문화/생활", isChecked: false },
  { dbKey: "entertainment", key: "연예", isChecked: false },
  { dbKey: "it_science", key: "IT/과학", isChecked: false },
  { dbKey: "column", key: "칼럼", isChecked: false },
];

export const participantChecklist: ChecklistItem[] = [
  { dbKey: 1, key: "1:1", isChecked: false },
  { dbKey: 3, key: "3:3", isChecked: false },
];

export const stanceChecklist: ChecklistItem[] = [
  { dbKey: "pro", key: "찬성", isChecked: false },
  { dbKey: "con", key: "반대", isChecked: false },
];

export const hasVoteChecklist: ChecklistItem[] = [
  { dbKey: true, key: "승패 결정", isChecked: false },
  { dbKey: false, key: "승패 없음", isChecked: false },
];

export const timeChecklist: ChecklistItem[] = [
  { dbKey: 30, key: "30초", isChecked: false },
  { dbKey: 40, key: "40초", isChecked: false },
  { dbKey: 50, key: "50초", isChecked: false },
  { dbKey: 60, key: "60초", isChecked: false },
  { dbKey: 90, key: "90초", isChecked: false },
  { dbKey: 120, key: "120초", isChecked: false },
  { dbKey: 150, key: "150초", isChecked: false },
];

export const turnChecklist: ChecklistItem[] = [
  { dbKey: 3, key: "3번", isChecked: false },
  { dbKey: 4, key: "4번", isChecked: false },
  { dbKey: 5, key: "5번", isChecked: false },
  { dbKey: 6, key: "6번", isChecked: false },
  { dbKey: 7, key: "7번", isChecked: false },
  { dbKey: 8, key: "8번", isChecked: false },
  { dbKey: 9, key: "9번", isChecked: false },
  { dbKey: 10, key: "10번", isChecked: false },
];

const allChecklists = [
  ...continentChecklist,
  ...categoryChecklist,
  ...participantChecklist,
  ...stanceChecklist,
  ...hasVoteChecklist,
  ...timeChecklist,
  ...turnChecklist,
];

export const getKeyFromDbKey = (dbKey: string | number | boolean) => {
  return allChecklists.find((item) => item.dbKey === dbKey)?.key || "";
};
