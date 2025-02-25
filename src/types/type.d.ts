type HeaderStatusType =
  | "default"
  | "debate-waiting"
  | "debate-ing"
  | "admin"
  | "landing";

type FooterStatusType = "default" | "landing";

interface RepotTableBodyType {
  reporter?: string;
  name: string;
  date: string;
  option?: string;
  admin?: string;
  reason: string;
}
