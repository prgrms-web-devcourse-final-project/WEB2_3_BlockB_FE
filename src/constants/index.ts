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

// 메인 페이지
const dates = new Date();

export const year = dates.getFullYear();

export let month: string;

switch (dates.getMonth()) {
  case 0:
    month = "Jan";
    break;
  case 1:
    month = "Feb";
    break;
  case 2:
    month = "Mar";
    break;
  case 3:
    month = "Apr";
    break;
  case 4:
    month = "May";
    break;
  case 5:
    month = "Jun";
    break;
  case 6:
    month = "Jul";
    break;
  case 7:
    month = "Aug";
    break;
  case 8:
    month = "Sep";
    break;
  case 9:
    month = "Oct";
    break;
  case 10:
    month = "Nov";
    break;
  case 11:
    month = "Dec";
    break;
}

export const date = dates.getDate();

export let day: string;

switch (dates.getDay()) {
  case 1:
    day = "Mon";
    break;
  case 2:
    day = "Tue";
    break;
  case 3:
    day = "Wed";
    break;
  case 4:
    day = "Thu";
    break;
  case 5:
    day = "Fri";
    break;
  case 6:
    day = "Sat";
    break;
  case 7:
    day = "Sun";
    break;
}

export const reportReasons: ChecklistItem[] = [
  { dbKey: "sexual", key: "음란성/선정성", isChecked: false },
  { dbKey: "spam", key: "스팸/광고", isChecked: false },
  { dbKey: "abuse", key: "욕설/인신공격", isChecked: false },
  { dbKey: "flooding", key: "도배", isChecked: false },
  { dbKey: "privacy", key: "개인정보 노출", isChecked: false },
  { dbKey: "ragequit", key: "사유 없는 탈주", isChecked: false },
];
// 관리자 페이지

export const processedFilters = [
  { label: "전체", value: "all", width: "w-[74px]" },
  { label: "음란/선정성", value: "sexual", width: "w-[118px]" },
  { label: "스팸/광고", value: "ad", width: "w-[105px]" },
  { label: "욕설/인신공격", value: "profanity", width: "w-[131px]" },
  { label: "도배", value: "papering", width: "w-[74px]" },
  {
    label: "개인정보 노출",
    value: "personalInformation",
    width: "w-[129px]",
  },
  { label: "사유없는 탈주", value: "escape", width: "w-[129px]" },
];
export const processedHeader = [
  "신고 사유",
  "신고자",
  "신고대상자",
  "신고 날짜",
  "조치",
];

export const unProcessedFilters = [
  { label: "전체", value: "all", width: "w-[74px]" },
  { label: "경고", value: "warn", width: "w-[74px]" },
  { label: "일시정지", value: "pause", width: "w-[100px]" },
  { label: "영구정지", value: "permanentStop", width: "w-[100px]" },
];

export const unProcessedHeader = [
  "처리 옵션",
  "처리 대상자",
  "처리자",
  "처리 사유",
  "처리 날짜",
  "조치",
];

export const editOptions = [
  { label: "경고", value: "warn", width: "w-[74px]" },
  { label: "일시정지", value: "pause", width: "w-[100px]" },
  { label: "영구정지", value: "permanentStop", width: "w-[100px]" },
  { label: "처리없음", value: "none", width: "w-[100px]" },
];
