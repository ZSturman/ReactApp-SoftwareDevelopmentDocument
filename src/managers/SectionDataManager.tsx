import { useCallback } from "react";
import { DocDataT, ChapterDataT, SectionDataT } from "../types/data";
import { generateRandomID } from "../utils";
import { defaultSectionData } from "../defaults/data";
import { updateDocApi } from "../api";

type SetChaptersType = (chapters: ChapterDataT[]) => void;

const getCurrentDateTime = () => {
  return Date.now();
};

export const useSectionDataManager = (
  doc: DocDataT | null,
  setChapters: SetChaptersType,
  url: string,
  setLastUpdatedItem: (id: string) => void
) => {
  const chapters = doc?.chapters || [];

  /* -------------------------------------------
  --------------  FIND SECTION(S)  --------------
------------------------------------------- */

  const getSectionsByChapterId = useCallback(
    (chapterId: string) => {
      const chapter = chapters.find((chapter) => chapter.id === chapterId);
      return chapter ? chapter.sections : [];
    },
    [chapters]
  );

  const getSectionById = useCallback(
    (sectionId: string) => {
      for (const chapter of chapters) {
        const section = chapter.sections.find((s) => s.id === sectionId);
        if (section) return section;
      }
      return null;
    },
    [chapters]
  );

  /* -------------------------------------------
  --------------  UPDATE AND SAVE  --------------
------------------------------------------- */

  const updateChaptersAndSave = useCallback(
    (updatedChapters: ChapterDataT[], updatedSectionId?: string) => {
      if (doc) {
        const updatedChaptersWithDate = updatedChapters.map((chapter) => ({
          ...chapter,
          sections: chapter.sections.map((section) => {
            if (updatedSectionId && section.id === updatedSectionId) {
              return {
                ...section,
                settings: {
                  ...section.settings,
                  dateUpdated: getCurrentDateTime(),
                },
              };
            }
            return section;
          }),
        }));

        setChapters(updatedChaptersWithDate);
        const updatedDoc = { ...doc, chapters: updatedChaptersWithDate };
        updateDocApi(url, updatedDoc);
      }
    },
    [doc, setChapters, url]
  );

  /* -------------------------------------------
  --------------  ADD SECTION  --------------
------------------------------------------- */

  const addSection = useCallback(
    (chapterId: string) => {
      const newSection: SectionDataT = {
        ...defaultSectionData,
        id: generateRandomID(),
        title: `Section ${getSectionsByChapterId(chapterId).length + 1}`,
        settings: {
          ...defaultSectionData.settings,
          dateCreated: getCurrentDateTime(),
          dateUpdated: getCurrentDateTime(),
        },
      };

      if (doc) {
        const selectedChapter = chapters.find(
          (chapter) => chapter.id === chapterId
        );
        if (!selectedChapter) return;
        const updatedSections = [...selectedChapter.sections, newSection];
        const updatedChapter = {
          ...selectedChapter,
          settings: {
            ...selectedChapter.settings,
            dateUpdated: getCurrentDateTime(),
          },
          sections: updatedSections,
          height: selectedChapter.height + newSection.height,
        };
        const updatedChapters = chapters.map((chapter) =>
          chapter.id === chapterId ? updatedChapter : chapter
        );
        updateChaptersAndSave(updatedChapters, newSection.id);
        setLastUpdatedItem(newSection.id);

      }
    },
    [
      chapters,
      updateChaptersAndSave,
      doc,
      getSectionsByChapterId,
      setLastUpdatedItem
    ]
  );

  /* -------------------------------------------
  --------------  REMOVE SECTION --------------
------------------------------------------- */
  const removeSection = useCallback(
    (sectionId: string) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.filter(
          (section) => section.id !== sectionId
        ),
      }));
      updateChaptersAndSave(updatedChapters);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  REORDER SECTION  --------------
------------------------------------------- */

  const reorderSections = useCallback(
    (sourceSectionId: string, destinationSectionId: string) => {
      // Find the chapter that contains the source section
      let sourceChapterIndex = -1;
      let sourceSectionIndex = -1;
      let destinationSectionIndex = -1;

      chapters.forEach((chapter, chapterIndex) => {
        const tempSourceIndex = chapter.sections.findIndex(
          (section) => section.id === sourceSectionId
        );
        const tempDestinationIndex = chapter.sections.findIndex(
          (section) => section.id === destinationSectionId
        );

        if (tempSourceIndex !== -1) {
          sourceChapterIndex = chapterIndex;
          sourceSectionIndex = tempSourceIndex;
        }

        if (tempDestinationIndex !== -1) {
          destinationSectionIndex = tempDestinationIndex;
        }
      });

      // If section is not found or source and destination are the same, return
      if (
        sourceChapterIndex === -1 ||
        sourceSectionIndex === destinationSectionIndex
      ) {
        return;
      }

      // Reordering sections within the found chapter
      const reorderedChapters = [...chapters];
      const sourceChapter = reorderedChapters[sourceChapterIndex];
      const [removedSection] = sourceChapter.sections.splice(
        sourceSectionIndex,
        1
      );
      sourceChapter.sections.splice(destinationSectionIndex, 0, removedSection);

      // Update the chapters
      updateChaptersAndSave(reorderedChapters, sourceSectionId);
      setLastUpdatedItem(sourceSectionId);
    },
    [chapters, setChapters, setLastUpdatedItem, updateChaptersAndSave]
  );

  /* -------------------------------------------
  -------------- TITLE  --------------
------------------------------------------- */

  const changeSectionTitle = useCallback(
    (sectionId: string, newTitle: string) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) =>
          section.id === sectionId ? { ...section, title: newTitle } : section
        ),
      }));

      updateChaptersAndSave(updatedChapters, sectionId);
      setLastUpdatedItem(sectionId);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  -------------- VISIBILITY  --------------
------------------------------------------- */

  const changeSectionVisibility = useCallback(
    (sectionId: string, isVisible: boolean) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                settings: { ...section.settings, visible: isVisible },
              }
            : section
        ),
      }));

      updateChaptersAndSave(updatedChapters, sectionId);
    },
    [chapters, updateChaptersAndSave]
  );

  /* -------------------------------------------
  --------------  LAYOUT  --------------
------------------------------------------- */

  const changeSectionFlowDirection = useCallback(
    (sectionId: string, flowDirection: boolean) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                settings: {
                  ...section.settings,
                  flowDirectionRow: flowDirection,
                },
              }
            : section
        ),
      }));
      updateChaptersAndSave(updatedChapters, sectionId);
      setLastUpdatedItem(sectionId);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  EXPANDED   --------------
------------------------------------------- */
  const isSectionExpanded = useCallback(
    (sectionId: string) => {
      for (const chapter of chapters) {
        const section = chapter.sections.find((s) => s.id === sectionId);
        if (section) return section.settings.expanded;
      }
      return false;
    },
    [chapters]
  );

  const setSectionExpanded = useCallback(
    (sectionId: string, isExpanded: boolean) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                settings: { ...section.settings, expanded: isExpanded },
              }
            : section
        ),
      }));

      updateChaptersAndSave(updatedChapters, sectionId);
    },
    [chapters, setChapters]
  );

  /* ------------------------------------------
------------------------------------------- */

  return {
    chapters,
    setChapters,
    addSection,
    removeSection,
    changeSectionTitle,
    changeSectionVisibility,
    changeSectionFlowDirection,
    setSectionExpanded,
    getSectionsByChapterId,
    reorderSections,
    getSectionById,
    isSectionExpanded,
  };
};
