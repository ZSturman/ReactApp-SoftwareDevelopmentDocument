import { CoverPageSettingsDataT } from "./DocDataType";

export interface DocPageT {
  docOrder: number;
  id: string;
  coverPage: CoverPageSettingsDataT | null;
  chapters: ChapterPageT | null;
}

export interface ChapterPageT {
  id: string;
  chapterPageNum: number;
  chapterId: string;
  sections: SectionPageT[] | [];
  chapterHeight: number;
}

export interface SectionPageT {
  id: string;
  sectionPageNum: number;
  sectionId: string;
  contents: ContentPageT[] | [];
  sectionHeight: number;
}

export interface ContentPageT {
  id: string;
  contentPageNum: number;
  contentId: string;
  contentHeight: number;
}
