import category from "./category-progress.svg";
import categoryChecked from "./category-progress_checked.svg";
import continent from "./continent-progress.svg";
import continentChecked from "./continent-progress_checked.svg";
import description from "./des-progress.svg";
import descriptionChecked from "./des-progress_checked.svg";
import hasVote from "./hasVote-progress.svg";
import hasVoteChecked from "./hasVote-progress_checked.svg";
import participant from "./participant-progress.svg";
import participantChecked from "./participant-progress_checked.svg";
import stance from "./stance-progress.svg";
import stanceChecked from "./stance-progress_checked.svg";
import time from "./time-progress.svg";
import timeChecked from "./time-progress_checked.svg";
import title from "./title-progress.svg";
import titleChecked from "./title-progress_checked.svg";

const progress: {
  [key: string]: string;
} = {
  title,
  titleChecked,
  description,
  descriptionChecked,
  continent,
  continentChecked,
  category,
  categoryChecked,
  participant,
  participantChecked,
  stance,
  stanceChecked,
  hasVote,
  hasVoteChecked,
  time,
  timeChecked,
};

export default progress;
