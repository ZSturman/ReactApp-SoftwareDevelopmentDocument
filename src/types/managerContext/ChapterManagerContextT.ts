import { ChapterDataT } from "../data";


export interface ChapterManagerContextT {
  chapters: ChapterDataT[] | [];
  setChapters: (chapters: ChapterDataT[] | [] ) => void;
  getChapterById: (id: string) => ChapterDataT | null;
  addChapter: () => void
  removeChapter: (id: string) => void;

  isChapterExpanded: (id: string) => boolean;

    /* General Settings */
  changeChapterTitle: (id: string, title: string) => void;
  changeChapterVisibility: (id: string, visible: boolean) => void;
  setChapterExpanded: (id: string, expanded: boolean) => void;

  reorderChapters: (dragID: string, dropID: string) => void;


}
