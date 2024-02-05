import { ChapterDataT, DocDataT, DocPageT } from "../data";
import { ChapterManagerContextT } from "./ChapterManagerContextT";
import { SectionManagerContextT } from "./SectionManagerContextT";
import { ContentManagerContextT } from "./ContentManagerContextT";
import { DocPreviewManagerContextT } from "./DocPreviewManagerContextT"
import { ThemeTokensDataT } from "../theme/ThemeTokens";

export interface DocManagerContextT {
  docs: DocDataT[];
  setDocs: (docs: DocDataT[]) => void;
  doc: DocDataT | null;
  setDoc: (doc: DocDataT) => void;
  docPages: DocPageT[];
  setDocPages: (pages: DocPageT[]) => void;


  rubbishBin: DocDataT[];
  setRubbishBin: (docs: DocDataT[]) => void;
  activeDocs: DocDataT[];
  setActiveDocs: (docs: DocDataT[]) => void;

  addDoc: () => void;
  updateDoc: (doc: DocDataT) => void;

  removeDoc: (id: string) => void;
  putBackDoc: (id: string) => void;
  deleteDoc: (id: string) => void;

  /* General Settings */
  changeDocTitle: (title: string) => void;
  

  /* Contributors */
  addContributor: () => void;
  removeContributor: (id: string) => void;
  editContributors: (id:string, inputField: string, value: string) => void;

  /* Settings */
  changeDocTheme: ( theme: string) => void;

  // LGOO
  removeDocLogo: () => void;
  changeDocLogo: (logo: string) => void;

  currentPage: DocPageT;
  setCurrentPage: (page: DocPageT) => void;



  /* CoverPageSettings */
  enableCoverPage: (enable: boolean) => void;
  coverPageVisible: (visible: boolean) => void;
  changeCoverPageTheme: (coverPageTheme: string) => void;
  showContributors: (showContributors: boolean) => void;
  showLogo: (showLogo: boolean) => void;
  changeCoverPageLayout: (layout: string[]) => void;
  changeHorizonalAlignment: (alignment: string) => void;
  changeVerticalAlignment: (alignment: string) => void;

  chapterDataManager: ChapterManagerContextT;
  sectionDataManager: SectionManagerContextT;
  contentDataManager: ContentManagerContextT;

  docPreviewManager: DocPreviewManagerContextT;

  theme: ThemeTokensDataT
  updateTheme: (theme: Partial<ThemeTokensDataT>) => void;
  isThemeUpdated: boolean;
  setIsThemeUpdated: (isUpdated: boolean) => void;
  setDocPagesBasedOnChapters: (chapters: ChapterDataT[]) => void;

  lastUpdatedItem: string;
}
