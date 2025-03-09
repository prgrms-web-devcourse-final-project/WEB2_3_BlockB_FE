import blueColumn from "../category/blueColumn.svg";
import blueCultureLife from "../category/blueCultureLife.svg";
import blueEconomy from "../category/blueEconomy.svg";
import blueEntertainment from "../category/blueEntertainment.svg";
import blueITScience from "../category/blueITScience.svg";
import bluePolitics from "../category/bluePolitics.svg";
import blueSociety from "../category/blueSociety.svg";
import blueSports from "../category/blueSports.svg";
import blueEtc from "../category/blueEtc.svg";

import grayColumn from "../category/grayColumn.svg";
import grayCultureLife from "../category/grayCultureLife.svg";
import grayEconomy from "../category/grayEconomy.svg";
import grayEntertainment from "../category/grayEntertainment.svg";
import grayITScience from "../category/grayITScience.svg";
import grayPolitics from "../category/grayPolitics.svg";
import graySociety from "../category/graySociety.svg";
import graySports from "../category/graySports.svg";
import grayEtc from "../category/grayEtc.svg";
interface CategoryIcon {
  blue: string;
  gray: string;
}

const categoryIcons: { [key: string]: CategoryIcon } = {
  정치: { blue: bluePolitics, gray: grayPolitics },
  경제: { blue: blueEconomy, gray: grayEconomy },
  사회: { blue: blueSociety, gray: graySociety },
  문화: { blue: blueCultureLife, gray: grayCultureLife },
  연예: { blue: blueEntertainment, gray: grayEntertainment },
  스포츠: { blue: blueSports, gray: graySports },
  IT: { blue: blueITScience, gray: grayITScience },
  칼럼: { blue: blueColumn, gray: grayColumn },
  기타: { blue: blueEtc, gray: grayEtc },
};

export default categoryIcons;
