import { ChapterManagerContextT } from "../../types/managerContext";
import { defaultChapterData } from "../data";

export const defaultChapterManagerContext: ChapterManagerContextT = {
  /* Boilerplate */
  chapters: [defaultChapterData],
  setChapters: () => { },
  addChapter: () => { },
  removeChapter: () => { },

  /* General Settings */
  changeChapterTitle: () => { },
  changeChapterVisibility: () => { },
  setChapterExpanded: () => { },
  getChapterById: () => defaultChapterData,
  isChapterExpanded: () => false,
  reorderChapters: () => { },
};
