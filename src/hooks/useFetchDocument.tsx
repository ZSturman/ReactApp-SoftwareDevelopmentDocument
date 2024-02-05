/* import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { DocumentDataType } from "../types/DocumentType";

function useFetchDocuments(url: string) {
  const { data, loading, error } = useFetch(url);
  const [documentsList, setDocumentsList] = useState<DocumentDataType[]>([]);

  useEffect(() => {
    // Check if data.documents is an array
    if (Array.isArray(data.documents)) {
      setDocumentsList(data.documents);
    }
    // If not, check if data.documents.documents is an array
    else if (Array.isArray(data.documents?.documents)) {
      setDocumentsList(data.documents.documents);
    } else {
      setDocumentsList([]);
    }
  }, [data]);

  return { documentsList, setDocumentsList, loading, error };
}

export default useFetchDocuments;
 */