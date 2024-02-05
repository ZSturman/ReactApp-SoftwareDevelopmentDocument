import { ChapterDataT, SectionDataT } from "../data";

export interface SectionManagerContextT {
  chapters: ChapterDataT[] | [];
  setChapters: (chapters: ChapterDataT[] | [] ) => void;
  addSection: (chapterId: string) => void;
  removeSection: (id: string) => void;
  changeSectionTitle: (id: string, title: string) => void;
  changeSectionVisibility: (id: string, visible: boolean) => void;
  changeSectionFlowDirection: (id: string, flowDirectionRow: boolean) => void;
  setSectionExpanded: (id: string, expanded: boolean) => void;
  getSectionsByChapterId: (chapterId: string) => SectionDataT[];
  reorderSections: (dragID: string, dropID: string) => void;
  isSectionExpanded: (id: string) => boolean;
  getSectionById: (id: string) => SectionDataT | null;
}
