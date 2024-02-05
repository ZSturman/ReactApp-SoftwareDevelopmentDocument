import { useState } from "react";
import { ChapterDataT, DocDataT } from "../types/data";
import { DocPageT } from "../types/data/PreviewPagesType";

export const useDocPreviewManager = (
  doc: DocDataT | null,
  currentPage: DocPageT,
  docPages: DocPageT[] | [],
  setCurrentPage: (page: DocPageT) => void,
  setDocPagesBasedOnChapters: (chapters: ChapterDataT[]) => void
) => {
  const [isDimensionsLoaded, setIsDimensionsLoaded] = useState(false);

  if (!docPages && doc) {
    setDocPagesBasedOnChapters(doc.chapters || []);
  }

  const resetDocPages = () => {
    if (doc) {
      setDocPagesBasedOnChapters(doc.chapters || []);
    }
  };

  // Navigation functions
  const goToNextPage = () => {
    if (!docPages || !currentPage) return;

    const nextPageOrder = currentPage.docOrder + 1;

    if (Array.isArray(docPages)) {
      const nextPage = docPages.find(
        (page: DocPageT) => page.docOrder === nextPageOrder
      );

      if (nextPage) {
        setCurrentPage(nextPage);
      }
    }
  };

  const goToPrevPage = () => {
    if (!currentPage || !docPages) return;

    const prevPageOrder = currentPage.docOrder - 1;

    if (prevPageOrder === 1) {
      goToFirstPage();
    }

    // Type guard to ensure docPages is of type DocPageT[]
    if (Array.isArray(docPages)) {
      const prevPage = docPages.find(
        (page: DocPageT) => page.docOrder === prevPageOrder
      );

      if (prevPage) {
        setCurrentPage(prevPage);
      }
    }
  };

  const goToFirstPage = () => {
    if (!docPages) return;
    const firstPage = docPages[0];

    if (firstPage) {
      setCurrentPage(firstPage);
    }
  };

  const goToLastPage = () => {
    if (!docPages) return;

    if (Array.isArray(docPages)) {
      const lastPageOrder = Math.max(
        ...docPages.map((page: DocPageT) => page.docOrder)
      );
      const lastPage = docPages.find(
        (page: DocPageT) => page.docOrder === lastPageOrder
      );

      if (lastPage) {
        setCurrentPage(lastPage);
      }
    }
  };

  return {
    currentPage,
    setCurrentPage,
    docPages,
    goToNextPage,
    goToPrevPage,
    goToLastPage,
    goToFirstPage,
    setDocPagesBasedOnChapters,
    resetDocPages,
    isDimensionsLoaded,
    setIsDimensionsLoaded,
  };
};
