import { ContentManagerContextT } from "../../types/managerContext/ContentManagerContextT";
import { defaultContentData } from "../data";

export const defaultContentManagerContext: ContentManagerContextT = {
  chapters: [],
  setChapters: () => {},
  addContent: () => "", 
  removeContent: () => {},
  changeContentItem: () => {},
  getContentsBySectionId: () => [],
  getContentById: () => defaultContentData,
  reorderContent: () => {},
  changeContentHeight: () => {},
};



