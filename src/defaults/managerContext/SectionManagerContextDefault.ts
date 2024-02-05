import { SectionManagerContextT } from "../../types/managerContext";
import { defaultChapterData } from "../data";

export const defaultSectionManagerContext: SectionManagerContextT = {
  chapters: [defaultChapterData],
  setChapters: () => {},
  //sections: [defaultSectionData],
  //setSections: () => {},
  addSection: () => {},
  removeSection: () => {},
  //changeSectionName: () => {},
  changeSectionVisibility: () => {},
  changeSectionFlowDirection: () => {},
  setSectionExpanded: () => {},
  getSectionsByChapterId: () => [],
  reorderSections: () => {},
  //getSectionById: () => {},
  isSectionExpanded: () => false,
  changeSectionTitle: () => {},
  getSectionById: () => null,
};
