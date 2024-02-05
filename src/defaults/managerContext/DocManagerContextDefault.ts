import { DocManagerContextT } from "../../types/managerContext";
import { defaultDocData } from "../data";
import { defaultChapterManagerContext } from "./ChapterManagerContextDefault";
import { defaultSectionManagerContext } from "./SectionManagerContextDefault";
import { defaultContentManagerContext } from "./ContentManagerContextDefault";
import { defaultCoverPage, defaultDocPreviewManagerContext } from "../previewContext"
import { defaultThemeTokens } from "../theme/defaultTheme";

export const defaultDocManagerContext: DocManagerContextT = {
  docs: [],
  setDocs: () => { },
  addDoc: () => { },
  updateDoc: () => { },

  doc: defaultDocData,
  setDoc: () => { },
  removeDoc: () => { },
  putBackDoc: () => { },
  deleteDoc: () => { },
  changeDocTitle: () => { },
  changeDocLogo: () => { },
  addContributor: () => { },
  removeContributor: () => { },
  editContributors: () => { },
  removeDocLogo: () => { },
  changeDocTheme: () => { },
  rubbishBin: [],
  setRubbishBin: () => { },
  activeDocs: [],
  setActiveDocs: () => { },
  chapterDataManager: {
    ...defaultChapterManagerContext
  },
  sectionDataManager: { ...defaultSectionManagerContext },
  contentDataManager: { ...defaultContentManagerContext },
  docPreviewManager: { ...defaultDocPreviewManagerContext },

  currentPage: {
    docOrder: 0,
    id: "",
    coverPage: defaultCoverPage,
    chapters: null
  },
  setCurrentPage: () => { },


  enableCoverPage: () => { },
  coverPageVisible: () => { },
  changeCoverPageTheme: () => { },
  showContributors: () => { },
  showLogo: () => { },
  changeCoverPageLayout: () => { },
  changeHorizonalAlignment: () => { },
  changeVerticalAlignment: () => { },
  docPages: [],
  setDocPages: () => {},
  theme: defaultThemeTokens,
  updateTheme: () => {},
  isThemeUpdated: false,
  setIsThemeUpdated: () => {},
  setDocPagesBasedOnChapters: () => {},

  lastUpdatedItem: ""
};
