import { DocPageT,ChapterDataT } from "../data";

export interface DocPreviewManagerContextT {
    currentPage: DocPageT;
    setCurrentPage: (currentPage: DocPageT) => void;
    docPages: DocPageT[];
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToLastPage: () => void;
    goToFirstPage: () => void;
    setDocPagesBasedOnChapters: (chapters: ChapterDataT[]) => void;
    resetDocPages: () => void;
    isDimensionsLoaded: boolean;
    setIsDimensionsLoaded: (isDimensionsLoaded: boolean) => void;
}

