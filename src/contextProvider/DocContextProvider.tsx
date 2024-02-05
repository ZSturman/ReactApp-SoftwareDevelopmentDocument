import { useState, useEffect, ReactNode } from "react";
import { DocDataContext } from "../contexts";
import { useDocDataManager } from "../managers";
import { defaultDocsData } from "../defaults/data";
import { fetchDataApi } from "../api";
import {
  sortDeletedDocs,
  sortDocuments,
  useThemeUpdater,
  useWindowDimensions,
} from "../utils";
import { deleteDocApi } from "../api";

export const DocDataProvider = ({ children }: { children: ReactNode }) => {
  const docManager = useDocDataManager(defaultDocsData);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; // Maximum number of retries
  const retryDelay = 5000; // Retry after 5 seconds

  const dimensions = useWindowDimensions();
  useThemeUpdater(dimensions, () => docManager.setIsThemeUpdated(true));


  useEffect(() => {
    if (
      docManager.theme.page.width === 0 ||
      docManager.theme.page.height === 0
    ) {
      const aspectRatio = 1 / 1.414;
      const newHeight = dimensions.height;
      const newWidth = newHeight * aspectRatio;

      docManager.theme.page.width = newWidth;
      docManager.theme.page.height = newHeight;
    }
  }, [dimensions.height, docManager.theme.page]);

  useEffect(() => {
    const processChapters = () => {
      if (
        docManager.doc &&
        docManager.doc.chapters.length > 0 &&
        docManager.isThemeUpdated
      ) {
        docManager.docPreviewManager.setDocPagesBasedOnChapters(
          docManager.doc.chapters
        );
      } 
    };

    if (isDataLoaded) {
      processChapters();
    }
  }, [docManager.doc]);

  useEffect(() => {
    const loadData = async () => {

      try {
        const data = await fetchDataApi(docManager.url);
        // Directly work with fetched data
        if (data.length === 0) {
          docManager.addDoc();
        }
        const { activeDocs, rubbishBin, setToDelete } = sortDeletedDocs(data);
        const sortedDocs = sortDocuments(activeDocs, "dateUpdated", false);

        if (sortedDocs.length > 0) {
          const selectedDoc = sortedDocs[0];
          docManager.setDoc(selectedDoc);
          
        } else {
         
          docManager.setDoc(null);
        }

        docManager.setActiveDocs(sortedDocs);
        docManager.setRubbishBin(rubbishBin);
        setToDelete.forEach((doc) => {
          deleteDocApi(docManager.url, doc.id);
        });

        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to load data: ", error);
        if (retryCount < maxRetries) {
          setTimeout(() => setRetryCount(retryCount + 1), retryDelay);
        }
      }
    };
    if (!isDataLoaded) {
      loadData();
    }
  }, [retryCount]);




  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <DocDataContext.Provider value={docManager}>
      {children}
    </DocDataContext.Provider>
  );
};
