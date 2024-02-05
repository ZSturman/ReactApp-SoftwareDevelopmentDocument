import { useCallback } from "react";
import { ChapterDataT, ChapterPageT, DocDataT } from "../types/data";
import { generateRandomID } from "../utils";
import { defaultChapterData, defaultSectionData } from "../defaults/data";
import { updateDocApi } from "../api";

type SetChaptersType = (chapters: ChapterDataT[]) => void;
//type SetDocPagesType = (chapters: DocPagesT[]) => void;

const getCurrentDateTime = () => {
  return Date.now();
};

export const useChapterDataManager = (
  doc: DocDataT | null,
  setChapters: SetChaptersType,
  url: string,
  addChapterToDocPages: (chapter: ChapterPageT) => void,
  setLastUpdatedItem: (id: string) => void
) => {
  /* -------------------------------------------
  --------------  FIND CHAPTER(S)  --------------
------------------------------------------- */
  const chapters = doc?.chapters || [];

  const getChapterById = useCallback(
    (chapterId: string) => {
      return chapters.find((chapter) => chapter.id === chapterId) || null;
    },
    [chapters]
  );

  /* -------------------------------------------
  --------------  UPDATE AND SAVE  --------------
------------------------------------------- */

  const updateChaptersAndSave = useCallback(
    (updatedChapters: ChapterDataT[], updatedChapterId?: string) => {
      if (doc) {
        const updatedChaptersWithDate = updatedChapters.map((chapter) => {
          if (updatedChapterId && chapter.id === updatedChapterId) {
            return {
              ...chapter,
              settings: {
                ...chapter.settings,
                dateUpdated: getCurrentDateTime(),
              },
            };
          }
          return chapter;
        });

        setChapters(updatedChaptersWithDate);
        const updatedDoc = { ...doc, chapters: updatedChaptersWithDate };
        updateDocApi(url, updatedDoc);
      }
    },
    [doc, setChapters, url]
  );

  /* -------------------------------------------
  --------------  ADD CHAPTER  --------------
------------------------------------------- */

const addChapter = useCallback(() => {
  const generatedChapterId = generateRandomID();
  const newChapter = {
    ...defaultChapterData,
    id: generatedChapterId,
    title: `Chapter ${chapters.length + 1}`,
    sections: [{...defaultSectionData, id: generateRandomID()}],
    settings: {
      ...defaultChapterData.settings,
      dateCreated: getCurrentDateTime(),
      dateUpdated: getCurrentDateTime(),
    },
  };
  
  // Update chapters in the document
  updateChaptersAndSave([...chapters, newChapter], generatedChapterId);

  // Create a ChapterPageT object for the new chapter
  const newChapterPage: ChapterPageT = {
    id: generatedChapterId,
    chapterPageNum: chapters.length + 1, // or another logic for numbering
    chapterId: generatedChapterId,
    sections: [], // Assuming no sections initially
    chapterHeight: 0 // Default height, adjust as needed
  };

  // Add the new chapter page to the doc pages
  addChapterToDocPages(newChapterPage);
  setLastUpdatedItem(generatedChapterId);

}, [chapters, updateChaptersAndSave, addChapterToDocPages]);

  /* -------------------------------------------
  --------------  REMOVE CHAPTER  --------------
------------------------------------------- */

  const removeChapter = useCallback(
    (chapterId: string) => {
      let updatedChapters = chapters.filter(
        (chapter) => chapter.id !== chapterId
      );
      if (updatedChapters.length === 0) {
        updatedChapters=[];
      }
      updateChaptersAndSave(updatedChapters);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  REORDER  --------------
------------------------------------------- */

  const reorderChapters = useCallback(
    (sourceId: string, destinationId: string) => {
      const sourceIndex = chapters.findIndex(
        (chapter) => chapter.id === sourceId
      );
      const destinationIndex = chapters.findIndex(
        (chapter) => chapter.id === destinationId
      );
      if (sourceIndex === destinationIndex) {
        return;
      }

      const reorderedChapters = [...chapters];
      const [removed] = reorderedChapters.splice(sourceIndex, 1);
      reorderedChapters.splice(destinationIndex, 0, removed);

      updateChaptersAndSave(reorderedChapters, sourceId);
      setLastUpdatedItem(sourceId);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  TITLE  --------------
------------------------------------------- */

  const changeChapterTitle = useCallback(
    (chapterId: string, newTitle: string) => {
      const updatedChapters = chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter
      );
      updateChaptersAndSave(updatedChapters, chapterId);
      setLastUpdatedItem(chapterId);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  EXPANDED  --------------
------------------------------------------- */

  const isChapterExpanded = useCallback(
    (chapterId: string) => {
      const chapter = getChapterById(chapterId);
      return chapter ? chapter.settings.expanded : false;
    },
    [getChapterById]
  );

  const setChapterExpanded = useCallback(
    (id: string, expanded: boolean) => {
      const updatedChapters = chapters.map((chapter) =>
        chapter.id === id
          ? { ...chapter, settings: { ...chapter.settings, expanded } }
          : chapter
      );
      updateChaptersAndSave(updatedChapters);
    },
    [chapters, setChapters]
  );

  /* -------------------------------------------
  --------------  VISIBILITY  --------------
------------------------------------------- */

  const changeChapterVisibility = useCallback(
    (id: string, visible: boolean) => {
      const updatedChapters = chapters.map((chapter) =>
        chapter.id === id
          ? { ...chapter, settings: { ...chapter.settings, visible } }
          : chapter
      );
      updateChaptersAndSave(updatedChapters, id);
    },
    [chapters, setChapters, getChapterById]
  );



  /* ------------------------------------------
------------------------------------------- */

  return {
    chapters,
    setChapters,
    getChapterById,
    addChapter,
    removeChapter,
    changeChapterTitle,
    changeChapterVisibility,
    isChapterExpanded,
    setChapterExpanded,
    reorderChapters,
  };
};
