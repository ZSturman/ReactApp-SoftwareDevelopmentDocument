import { ChapterDataT } from "./ChapterDataType";


export interface DocDataT {
  id: string;
  title: string;
  logo: string | null;
  chapters: ChapterDataT[] | [];
  contributors: ContributorDataT[] | [];
  coverPageSettings: CoverPageSettingsDataT;
  settings: DocSettingsDataT;
}

export interface CoverPageSettingsDataT {
  enabled: boolean;
  visible: boolean;
  coverPageTheme: string;
  showContributors: boolean;
  showLogo: boolean;
  layout: string[];
  horizontalAlignment: string;
  verticalAlignment: string;
}

interface DocSettingsDataT {
  theme: string;
  dateCreated: number;
  dateUpdated: number;
  isDeleted: boolean;
}

interface ContributorDataT {
  id: string;
  name: string;
  role: string;
}
