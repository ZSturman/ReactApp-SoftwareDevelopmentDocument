import { useEffect, useState, useCallback } from "react";
import { DocDataT, ChapterPageT, ChapterDataT, DocPageT } from "../types/data";
import { defaultDocData } from "../defaults/data";
import { defaultCoverPage } from "../defaults/previewContext";
import { checkChapterHeight, generateRandomID } from "../utils";
import { createDocApi, deleteDocApi, updateDocApi } from "../api";
import { useChapterDataManager } from "./ChapterDataManager";
import { useSectionDataManager } from "./SectionDataManager";
import { useContentDataManager } from "./ContentDataManager";
import { useDocPreviewManager } from "./DocPreviewManager";
import { defaultThemeTokens } from "../defaults/theme/defaultTheme";
import { ThemeTokensDataT } from "../types/theme/ThemeTokens";

export const useDocDataManager = (initialDocs: DocDataT[]) => {
  const [docs, setDocs] = useState(initialDocs);
  const [doc, setDoc] = useState<DocDataT | null>(null);
  const [docPages, setDocPages] = useState<DocPageT[]>([]);
  const [lastUpdatedItem, setLastUpdatedItem] = useState<string>("");
  const [theme, setTheme] = useState<ThemeTokensDataT>(defaultThemeTokens);
  const [activeDocs, setActiveDocs] = useState<DocDataT[]>([]);
  const [rubbishBin, setRubbishBin] = useState<DocDataT[]>([]);
  const [isThemeUpdated, setIsThemeUpdated] = useState(false);

  const url = "http://localhost:8000/documents";

  const initialPages: DocPageT = {
    docOrder: 1,
    id: generateRandomID(),
    coverPage: defaultCoverPage,
    chapters: null,
  };

  useEffect(() => {
    setDocPages([initialPages]);
  }, []);

  const [currentPage, setCurrentPage] = useState<DocPageT>(initialPages);

  /* -------------------------------------------
------------------------------------------- */

  const addChapterToDocPages = useCallback(
    (chapter: ChapterPageT) => {
      if (!docPages) {
        console.error("docPages is not initialized");
        return;
      }

      const newChapterPage: DocPageT = {
        docOrder: docPages.length + 1,
        id: generateRandomID(),
        coverPage: null,
        chapters: chapter,
      };

      const updatedPages = { ...docPages, newChapterPage };

      setDocPages(updatedPages);
    },
    [docPages]
  );

  /* -------------------------------------------
  -------------- THEME & DESIGN  --------------
------------------------------------------- */

  const updateTheme = useCallback(
    (newThemeValues: Partial<ThemeTokensDataT>) => {
      setTheme((prevTheme) => ({ ...prevTheme, ...newThemeValues }));
    },
    []
  );

  /* -------------------------------------------
  -------------- VALIDATE & UPDATE  --------------
------------------------------------------- */

  const validateAndSetCurrentDoc = useCallback(
    (newDoc: DocDataT | null) => {
      if (newDoc === null) {
        setDoc(null);
      } else if (activeDocs.includes(newDoc) && !rubbishBin.includes(newDoc)) {
        setDoc(newDoc);
      }
    },
    [activeDocs, rubbishBin, setDoc]
  );

  const updateDoc = useCallback((doc: DocDataT) => {
    updateDocApi(url, doc);
  }, []);

  /* -------------------------------------------
  -------------- ADD DOC  --------------
------------------------------------------- */
  const addDoc = useCallback(() => {
    const newDocId = generateRandomID();
    const newDoc = {
      ...defaultDocData,
      id: newDocId,
      title: `Document ${activeDocs.length + 1}`,
    };
    createDocApi(url, newDoc);
    setDocs([...docs, newDoc]);
    setActiveDocs([...activeDocs, newDoc]);
    setDoc(newDoc);
    updateDocApi(url, newDoc);

    // Create the initial page structure for the new document
    const initialDocPage: DocPageT = {
      docOrder: 1,
      id: "coverPage",
      coverPage: defaultCoverPage, // Assuming defaultCoverPage is of type CoverPageSettingsDataT
      chapters: null, // No chapters initially
    };

    setDocPages([initialDocPage]);
    setCurrentPage(initialDocPage); // Set the current page to the initialDocPage
  }, []); // Make sure dependencies are correctly set

  /* -------------------------------------------
  -------------- REMOVE DOC  --------------
------------------------------------------- */
  const removeDoc: (id: string) => void = useCallback(
    async (id: string) => {
      // Mark the function as async

      // Find the document to be removed
      const docToRemove = docs.find((doc) => doc.id === id);
      if (docToRemove) {
        // Update the document to mark it as deleted
        const updatedDoc = {
          ...docToRemove,
          settings: { ...docToRemove.settings, isDeleted: true },
        };

        // Remove the document from activeDocs and add to rubbishBin
        const newActiveDocs = activeDocs.filter((doc) => doc.id !== id);
        setActiveDocs(newActiveDocs);
        setRubbishBin([...rubbishBin, updatedDoc]);
        setDoc(newActiveDocs[0] || null);
        updateDocApi(url, updatedDoc);

        // Check if the removed doc is the current doc and update it
        if (doc && doc.id === id) {
          // Set doc to the next document in activeDocs or null if no more documents
          const nextDoc = newActiveDocs.length > 0 ? newActiveDocs[0] : null;
          setDoc(nextDoc);
        }
      } else {
        console.error("Document not found:", id, "in", docs);
      }
    },
    [docs, activeDocs, rubbishBin, doc, setDoc, updateDocApi, url]
  );

  const deleteDoc = useCallback(
    (id: string) => {
      // Filter out the deleted document from docs
      const updatedDocs = docs.filter((doc) => doc.id !== id);
      setDocs(updatedDocs);

      // If the document is in activeDocs, remove it
      const updatedActiveDocs = activeDocs.filter((doc) => doc.id !== id);
      setActiveDocs(updatedActiveDocs);

      // If the document is in rubbishBin, remove it
      const updatedRubbishBin = rubbishBin.filter((doc) => doc.id !== id);
      setRubbishBin(updatedRubbishBin);

      setDoc(updatedActiveDocs[0] || null);

      // Call the API to delete the document
      deleteDocApi(url, id);
    },
    [docs, activeDocs, rubbishBin, url]
  );

  /* -------------------------------------------
  -------------- PUT BACK --------------
------------------------------------------- */
  const putBackDoc: (id: string) => void = useCallback(
    (id: string) => {
      const docToRestore = rubbishBin.find((doc) => doc.id === id);
      if (docToRestore) {
        // Update the document's isDeleted setting
        const updatedDoc = {
          ...docToRestore,
          settings: { ...docToRestore.settings, isDeleted: false },
        };

        setActiveDocs([...activeDocs, updatedDoc]);
        setRubbishBin(rubbishBin.filter((doc) => doc.id !== id));
        setDoc(updatedDoc);
        updateDocApi(url, updatedDoc);

        // Update current document if it's the one being put back
        if (doc && doc.id === id) {
          validateAndSetCurrentDoc(updatedDoc);
        }
      } else {
        console.error("Document not found in rubbish bin:", id);
      }
    },
    [activeDocs, rubbishBin, url, doc, validateAndSetCurrentDoc]
  );

  /* -------------------------------------------
  -------------- SORT --------------
------------------------------------------- */
  const sortDocuments: (
    docs: DocDataT[],
    sortBy: string,
    ascending: boolean
  ) => void = useCallback((docs, sortBy, ascending) => {
    // Sort the filteredDocuments array
    const sortedDocuments = [...docs];
    sortedDocuments.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "dateUpdated" || sortBy === "dateCreated") {
        comparison = a.settings[sortBy] - b.settings[sortBy];
      } else if (sortBy === "alphabetical") {
        comparison = a.title.localeCompare(b.title);
      }

      return ascending ? comparison : -comparison;
    });

    return sortedDocuments;
  }, []);

  /* -------------------------------------------
  -------------- TITLE --------------
------------------------------------------- */

  const changeDocTitle: (title: string) => void = useCallback(
    (title) => {
      if (!doc) return;
      const updatedDoc = { ...doc, title };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
    },
    [docs, doc, updateDoc]
  );

  /* -------------------------------------------
  -------------- LOGO --------------
------------------------------------------- */

  const changeDocLogo: (logo: string) => void = useCallback(
    (logo) => {
      if (!doc) return;

      const updatedDoc = { ...doc, logo };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);

    },
    [docs, doc, updateDoc]
  );

  const removeDocLogo: () => void = useCallback(() => {
    changeDocLogo("");
  }, [changeDocLogo]);



  /* -------------------------------------------
  -------------- CONTRIBUTORS --------------
------------------------------------------- */

  const addContributor: () => void = useCallback(() => {
    if (!doc) return;
    const newContributor = {
      id: generateRandomID(),
      name: "",
      role: "",
    };
    const updatedContributors = [...doc.contributors, newContributor];

    const updatedDocument = {
      ...doc,
      contributors: updatedContributors,
    };
    setDoc(updatedDocument);
    updateDoc(updatedDocument);
    
  }, [docs, doc, updateDoc]);

  const removeContributor: (contributorId: string) => void = useCallback(
    (contributorId) => {
      if (!doc) return;
      const updatedContributors = doc.contributors.filter(
        (contributor) => contributor.id !== contributorId
      );

      const updatedDocument = {
        ...doc,
        contributors: updatedContributors,
      };
      setDoc(updatedDocument);
      updateDoc(updatedDocument);
      
    },
    [docs, doc, updateDoc]
  );

  const editContributors: (
    contributorId: string,
    inputField: string,
    value: string
  ) => void = useCallback(
    (contributorId, inputField, value) => {
      if (!doc) return;
      const updatedContributors = doc.contributors.map((contributor) => {
        if (contributor.id === contributorId) {
          return { ...contributor, ...{ [inputField]: value } };
        }
        return contributor;
      });

      const updatedDocument = {
        ...doc,
        contributors: updatedContributors,
      };
      setDoc(updatedDocument);
      updateDoc(updatedDocument);
      
    },
    [doc, updateDoc]
  );

  /* -------------------------------------------
  -------------- THEME --------------
------------------------------------------- */

  const changeDocTheme: (theme: string) => void = useCallback(
    (theme) => {
      if (!doc) return;
      const updatedDoc = { ...doc, theme };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      
    },
    [doc, updateDoc]
  );

  /* -------------------------------------------
  -------------- COVER PAGE --------------
------------------------------------------- */

  const enableCoverPage: (enabled: boolean) => void = useCallback(
    (enabled) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, enabled: enabled },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
    },
    [doc, updateDoc]
  );

  const coverPageVisible: (visible: boolean) => void = useCallback(
    (visible) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, visible: visible },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
    },
    [doc, updateDoc]
  );

  const changeCoverPageTheme: (coverPageTheme: string) => void = useCallback(
    (coverPageTheme) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, coverPageTheme },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  const showContributors: (showContributors: boolean) => void = useCallback(
    (showContributors) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, showContributors },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  const showLogo: (showLogo: boolean) => void = useCallback(
    (showLogo) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, showLogo },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  const changeCoverPageLayout: (layout: string[]) => void = useCallback(
    (layout) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: { ...doc.coverPageSettings, layout },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  const changeHorizonalAlignment: (alignment: string) => void = useCallback(
    (alignment) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: {
          ...doc.coverPageSettings,
          horizontalAlignment: alignment,
        },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  const changeVerticalAlignment: (alignment: string) => void = useCallback(
    (alignment) => {
      if (!doc) return;
      const updatedDoc = {
        ...doc,
        coverPageSettings: {
          ...doc.coverPageSettings,
          verticalAlignment: alignment,
        },
      };

      setDoc(updatedDoc);
      updateDoc(updatedDoc);
      setLastUpdatedItem("");
    },
    [doc, updateDoc]
  );

  /* -------------------------------------------
  --------------  CALCULATE DOC PAGES  --------------
  ------------------------------------------- */

  const setDocPagesBasedOnChapters = useCallback(
    (chapters: ChapterDataT[]) => {
      if (!doc) return null;

      // Initialize the order and pages array
      let order = 2; // Start from 2 since 1 is for the cover page
      const pages: DocPageT[] = [];

      // Create the cover page
      const coverPage: DocPageT = {
        docOrder: 1,
        id: "coverPage",
        coverPage: doc.coverPageSettings || defaultCoverPage, // Assuming coverPageSettings is of type CoverPageSettingsDataT
        chapters: null, // No chapters in the cover page
      };

      // Add the cover page as the first page
      pages.push(coverPage);

      // Process each chapter
      chapters.forEach((chapter) => {
        const chPages = checkChapterHeight(chapter, theme);

        // For each page in the chapter, create a DocPageT with the chapter as part of it
        chPages.forEach((page) => {
          const newChapterPage: DocPageT = {
            docOrder: order++,
            id: page.id,
            coverPage: null, // No cover page for chapter pages
            chapters: {
              id: page.id,
              chapterPageNum: page.chapterPageNum, // Assuming chPages includes pageNum
              chapterId: chapter.id,
              sections: page.sections, // Assuming you have sections data in your chapter
              chapterHeight: page.chapterHeight, // Assuming chPages includes height
            },
          };
          pages.push(newChapterPage);
        });
      });

      setDocPages(pages);

      // Return the new docPages
      return pages;
    },
    [doc, setDocPages, theme] // Make sure dependencies are correctly set
  );

  /* -------------------------------------------
  -------------- OTHER CONTEXT MANAGERS --------------
------------------------------------------- */

  const findMostRecentlyUpdatedId = useCallback(() => {
    if (!doc || !doc.chapters || lastUpdatedItem === "") {
      setCurrentPage(docPages[0]);
      return;
    }
    const mostRecentPage = docPages.find(
      (docPage) => docPage.chapters?.chapterId === lastUpdatedItem
    );

    if (mostRecentPage) {
      setCurrentPage(mostRecentPage);
    } else {
      if (
        Array.isArray(doc.chapters) &&
        doc.chapters.length > 0 &&
        doc.chapters[0].sections.length > 0
      ) {
        const mostRecentPage = docPages.find((docPage) => {
          if (Array.isArray(docPage.chapters?.sections)) {
            return docPage.chapters.sections.some(
              (section) => section.sectionId === lastUpdatedItem
            );
          }
        });
        if (mostRecentPage) {
          setCurrentPage(mostRecentPage);
        } else {
          const mostRecentPage = docPages.find((docPage) => {
            if (
              Array.isArray(docPage.chapters?.sections) &&
              docPage.chapters.sections.length > 0
            ) {
              const sections = docPage.chapters.sections;
              sections.forEach((section) => {
                if ("contents" in section) {
                  section.contents.forEach((content) => {
                    if (content.contentId === lastUpdatedItem) {
                      setCurrentPage(docPage);
                    }
                  });
                }
              });
            }
          });
          if (mostRecentPage) {
            setCurrentPage(mostRecentPage);
          } 
        }
      }
    }
  }, [doc, docPages, lastUpdatedItem, setCurrentPage]);

  useEffect(() => {
    findMostRecentlyUpdatedId();
  }, [lastUpdatedItem, findMostRecentlyUpdatedId]);

  const setChapters = useCallback(
    (newChapters: ChapterDataT[] | []) => {
      if (!Array.isArray(newChapters) || newChapters.length === 0) {
        return;
      }

      if (doc) {
        const updatedDoc = { ...doc, chapters: newChapters };
        setDoc(updatedDoc);
        validateAndSetCurrentDoc(updatedDoc);

        // Recalculate the docPages based on new chapters
        const updatedDocPages = setDocPagesBasedOnChapters(newChapters);

        if (!updatedDocPages) {
          return;
        }

        findMostRecentlyUpdatedId();
      }
    },
    [doc, validateAndSetCurrentDoc, setDocPagesBasedOnChapters, setCurrentPage]
  );

  const chapterDataManager = useChapterDataManager(
    doc ? doc : null,
    setChapters,
    url,
    addChapterToDocPages,
    setLastUpdatedItem
  );
  const sectionDataManager = useSectionDataManager(
    doc ? doc : null,
    setChapters,
    url,
    setLastUpdatedItem
  );
  const contentDataManager = useContentDataManager(
    doc ? doc : null,
    setChapters,
    url,
    setLastUpdatedItem
  );

  const docPreviewManager = useDocPreviewManager(
    doc ? doc : null,
    currentPage,
    docPages ? docPages : [],
    setCurrentPage,
    setDocPagesBasedOnChapters
  );

  /* ------------------------------------------
------------------------------------------- */

  return {
    docs,
    setDocs,
    doc,
    setDoc,
    docPages,
    setDocPages,
    currentPage,
    setCurrentPage,
    activeDocs,
    setActiveDocs,
    rubbishBin,
    setRubbishBin,
    url,
    addDoc,
    updateDoc,
    removeDoc,
    putBackDoc,
    deleteDoc,
    sortDocuments,

    changeDocTitle,
    changeDocLogo,
    changeDocTheme,
    chapterDataManager,
    sectionDataManager,
    contentDataManager,
    docPreviewManager,

    // LOGO
    removeDocLogo,

    // CONTRIBUTORS
    addContributor,
    removeContributor,
    editContributors,

    // COVER PAGE
    enableCoverPage,
    coverPageVisible,
    changeCoverPageTheme,
    showContributors,
    showLogo,
    changeCoverPageLayout,
    changeHorizonalAlignment,
    changeVerticalAlignment,

    theme,
    updateTheme,
    isThemeUpdated,
    setIsThemeUpdated,
    setDocPagesBasedOnChapters,

    lastUpdatedItem,
  };
};
