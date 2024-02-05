import { ContentDataT, ChapterDataT } from "../data";

export interface ContentManagerContextT {
  chapters: ChapterDataT[] | [];
  setChapters: (chapters: ChapterDataT[] | [] ) => void;

  addContent: (sectionId: string, contentType: string) => string;
  removeContent: (id: string) => void;

  changeContentItem: (id: string, item: string) => void;
  getContentsBySectionId: (sectionId: string) => ContentDataT[];
  getContentById: (id: string) => ContentDataT | null;
  reorderContent: (dragID: string, dropID: string) => void;

  changeContentHeight: (id: string, height: number) => void;


  

}