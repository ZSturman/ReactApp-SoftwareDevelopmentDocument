import { useCallback } from "react";
import { DocDataT, ContentDataT, ChapterDataT } from "../types/data";
import { defaultContentData } from "../defaults/data";
import { generateRandomID } from "../utils";
import { updateDocApi } from "../api";

type SetChaptersType = (chapters: ChapterDataT[]) => void;


export const useContentDataManager = (
  doc: DocDataT | null,
  setChapters: SetChaptersType,
  url: string,
  setLastUpdatedItem: (id: string) => void
) => {
  const chapters = doc?.chapters || [];

    /* -------------------------------------------
  -------------- UPDATE AND SAVE --------------
------------------------------------------- */


  const updateChaptersAndSave = useCallback(
    (updatedChapters: ChapterDataT[]) => {
      if (doc) {
        setChapters(updatedChapters);
        const updatedDoc = { ...doc, chapters: updatedChapters };
        updateDocApi(url, updatedDoc);
      }
    },
    [doc, setChapters, url]
  );

    /* -------------------------------------------
  -------------- FIND CONTENT --------------
------------------------------------------- */

  const getContentsBySectionId = useCallback(
    (sectionId: string) => {
      for (const chapter of chapters) {
        const section = chapter.sections.find((s) => s.id === sectionId);
        if (section) return section.contents;
      }
      return [];
    },
    [chapters]
  );

  const getContentById = useCallback(
    (contentId: string) => {
      for (const chapter of chapters) {
        for (const section of chapter.sections) {
          const content = section.contents.find(
            (c: ContentDataT) => c.id === contentId
          );
          if (content) return content;
        }
      }
      return null;
    },
    [chapters]
  );

    /* -------------------------------------------
  -------------- ADD CONTENT --------------
------------------------------------------- */

  const addContent = useCallback(
    (sectionId: string) => {
      const newContentId = generateRandomID();
      const newContent: ContentDataT = {
        ...defaultContentData,
        id: newContentId,
        settings: {
          ...defaultContentData.settings,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
        },
      };

      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) =>
          section.id === sectionId
            ? { ...section, contents: [...section.contents, newContent] }
            : section
        ),
      }));

      updateChaptersAndSave(updatedChapters);
      setLastUpdatedItem(newContentId);
      return newContentId
    },
    [chapters, setChapters, updateChaptersAndSave]
  );

    /* -------------------------------------------
  -------------- REMOVE CONTENT --------------
------------------------------------------- */

  const removeContent = useCallback(
    (contentId: string) => {
      const updatedChapters = chapters.map((chapter) => ({
        ...chapter,
        sections: chapter.sections.map((section) => ({
          ...section,
          settings: {
            ...section.settings,
            dateUpdated: Date.now(),
          },
          contents: section.contents.filter(
            (content: ContentDataT) => content.id !== contentId
          ),
        })),
      }));

      updateChaptersAndSave(updatedChapters);
    },
    [chapters, setChapters]
  );

    /* -------------------------------------------
  -------------- REORDER --------------
------------------------------------------- */

  // REORDER CONTENT ITEMS
  const reorderContent = useCallback(
    (sourceContentId: string, destinationContentId: string) => {
      // Initialize variables to hold indexes and a flag to stop further iteration
      let sourceSectionIndex = -1;
      let sourceContentIndex = -1;
      let destinationContentIndex = -1;
      let found = false;

      // Iterate over chapters and sections to find the section and indexes
      chapters.forEach((chapter) => {
        if (found) return;

        chapter.sections.forEach((section, sectionIndex) => {
          const tempSourceIndex = section.contents.findIndex(
            (content: ContentDataT) => content.id === sourceContentId
          );
          const tempDestinationIndex = section.contents.findIndex(
            (content: ContentDataT) => content.id === destinationContentId
          );

          if (tempSourceIndex !== -1) {
            sourceSectionIndex = sectionIndex;
            sourceContentIndex = tempSourceIndex;
            if (tempDestinationIndex !== -1) {
              destinationContentIndex = tempDestinationIndex;
              found = true; // Stop further iteration
            }
          }
        });
      });

      // If section or content is not found or source and destination are the same, return
      if (
        sourceSectionIndex === -1 ||
        sourceContentIndex === destinationContentIndex
      ) {
        return;
      }

      const reorderedChapters = [...chapters];
      const section =
        reorderedChapters[sourceSectionIndex].sections[sourceSectionIndex];
      const [removedContent] = section.contents.splice(sourceContentIndex, 1);
      section.contents.splice(destinationContentIndex, 0, removedContent);

      updateChaptersAndSave(reorderedChapters);
      setLastUpdatedItem(sourceContentId);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  TEXT ITEMS  --------------
------------------------------------------- */

const changeContentItem = useCallback(
  (contentId: string, newItem: string) => {
    console.log("changeContentItem", contentId, newItem);
    const currentContent = getContentById(contentId);
    if (currentContent && currentContent.item === newItem) {
      console.log("No change");
      return;
    }

    const currentDate = Date.now();

    const updatedChapters = chapters.map((chapter) => ({
      ...chapter,
      sections: chapter.sections.map((section) => ({
        ...section,
        contents: section.contents.map((content: ContentDataT) =>
          content.id === contentId ? {
            ...content,
            item: newItem,
            settings: { ...content.settings, dateUpdated: currentDate },
          } : content
        ),
      })),
    }));

    updateChaptersAndSave(updatedChapters);
    setLastUpdatedItem(contentId);
  },
  [chapters, setChapters]
);




const changeContentHeight = useCallback(
  (contentId: string, newHeight: number) => {
    const updatedChapters = chapters.map((chapter) => ({
      ...chapter,
      sections: chapter.sections.map((section) => ({
        ...section,
        contents: section.contents.map((content: ContentDataT) =>
          content.id === contentId ? {
            ...content, 
            height: newHeight,
          } : content
        ),
      })),
    }));

    updateChaptersAndSave(updatedChapters);
    setLastUpdatedItem(contentId);
  }
, [chapters, setChapters])


  /* ------------------------------------------
------------------------------------------- */

  return {
    chapters,
    setChapters,
    addContent,
    removeContent,

    changeContentHeight,

    getContentsBySectionId,
    getContentById,
    reorderContent,

    /* text item */
    changeContentItem,
  };
};
