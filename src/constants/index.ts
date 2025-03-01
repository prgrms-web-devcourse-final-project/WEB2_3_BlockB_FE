
export const continentChecklist: ChecklistItem[] = [
  { dbKey: "AS", key: "아시아/호주", isChecked: false },
  { dbKey: "AM", key: "미국/중남미", isChecked: false },
  { dbKey: "EU", key: "유럽", isChecked: false },
  { dbKey: "CN", key: "중국", isChecked: false },
  { dbKey: "JP", key: "일본", isChecked: false },
  { dbKey: "AF", key: "아프리카/중동", isChecked: false },
  { dbKey: "KR", key: "국내", isChecked: false },
];

export const categoryChecklist: ChecklistItem[] = [
  { dbKey: "PO", key: "정치", isChecked: false },
  { dbKey: "EC", key: "경제", isChecked: false },
  { dbKey: "SO", key: "사회", isChecked: false },
  { dbKey: "CU", key: "문화/생활", isChecked: false },
  { dbKey: "EN", key: "연예", isChecked: false },
  { dbKey: "IT", key: "IT/과학", isChecked: false },
  { dbKey: "CO", key: "칼럼", isChecked: false },
  { dbKey: "ETC", key: "기타", isChecked: false },
];

export const participantChecklist: ChecklistItem[] = [
  { dbKey: "T1", key: "1:1", isChecked: false },
  { dbKey: "T3", key: "3:3", isChecked: false },
];

export const stanceChecklist: ChecklistItem[] = [
  { dbKey: "PRO", key: "찬성", isChecked: false },
  { dbKey: "CON", key: "반대", isChecked: false },
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
  { dbKey: "OBSCENITY", key: "음란성/선정성", isChecked: false },
  { dbKey: "SPAM", key: "스팸/광고", isChecked: false },
  { dbKey: "CUSS", key: "욕설/인신공격", isChecked: false },
  { dbKey: "FLOODING", key: "도배", isChecked: false },
  { dbKey: "LEAKAGE", key: "개인정보 노출", isChecked: false },
  { dbKey: "DODGE", key: "사유 없는 탈주", isChecked: false },
];

// 관리자 페이지

type AdminFilter = {
  label: string, value: string, width: string
}

// 신고 사유
export const unprocessedFilters = [
  { label: "전체", value: "all", width: "w-[74px]" },
  { label: "음란/선정성", value: "OBSCENITY", width: "w-[118px]" },
  { label: "스팸/광고", value: "SPAM", width: "w-[105px]" },
  { label: "욕설/인신공격", value: "CUSS", width: "w-[131px]" },
  { label: "도배", value: "FLOODING", width: "w-[74px]" },
  {
    label: "개인정보 노출",
    value: "LEAKAGE",
    width: "w-[129px]",
  },
  { label: "사유없는 탈주", value: "DODGE", width: "w-[129px]" },
];

export const findFilterValue = (filterType: AdminFilter[], selectedLabel: string): string | undefined => {
  const tag = filterType.find((selection) => selection.label === selectedLabel);
  return tag ? tag.value : undefined;
};


export const unprocessedHeader = [
  "신고 사유",
  "신고자",
  "신고대상자",
  "신고 날짜",
  "조치",
];

// 처리 결과
export const processedFilters = [
  { label: "전체", value: "all", width: "w-[74px]" },
  { label: "경고", value: "WARNING", width: "w-[74px]" },
  { label: "일시정지", value: "SUSPENSION", width: "w-[100px]" },
  { label: "영구정지", value: "BAN", width: "w-[100px]" },
  { label: "처리없음", value: "NONE", width: "w-[100px]" },
];


export const processedHeader = [
  "처리 옵션",
  "처리 대상자",
  "처리자",
  "처리 날짜",
  "조치",
];

export const editOptions = [
  { label: "경고", value: "WARNING", width: "w-[74px]" },
  { label: "일시정지", value: "SUSPENSION", width: "w-[100px]" },
  { label: "영구정지", value: "BAN", width: "w-[100px]" },
  { label: "처리없음", value: "NONE", width: "w-[100px]" },
];

// TODO: 백엔드가 어떤 분류로 주는지 재확인
export const continentKR:Record<string, string> = {
  "AS": "아시아/호주",
  "AM": "미국/중남미",
  "EU": "유럽",
  "CN": "중국",
  "JP": "일본",
  "AF": "아프리카/중동",
  "KR": "국내"
}

export const categoryKR:Record<string, string> = {
  "PO": "정치",
  "EC": "경제",
  "SO": "사회",
  "CU": "문화",
  "EN": "엔터",
  "SP": "스포츠",
  "IT": "IT/과학",
  "CO": "칼럼",
  "ETC": "기타",
}