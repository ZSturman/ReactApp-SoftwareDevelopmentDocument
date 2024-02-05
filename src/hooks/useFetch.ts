/* import { useState, useEffect } from "react";
import { DocumentDataType } from "../types/DocumentType";

interface DocumentsDataType {
  documents: DocumentDataType[];
}

const useFetch = (url: string) => {
  const [data, setData] = useState<DocumentsDataType>({ documents: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error("Failed to fetch document data");
        }
        let jsonData;
        try {
          jsonData = await res.json();
        } catch (jsonError) {
          throw new Error("Error parsing JSON data");
        }

        if (jsonData && jsonData.documents && jsonData.documents.length > 0) {
          setData(jsonData);
        } else {
          const defaultDataRes = await fetch('/data/defaultData.json', { signal: abortController.signal });
          if (!defaultDataRes.ok) {
            throw new Error("Failed to fetch default document data");
          }
          const defaultData = await defaultDataRes.json();
          setData({ documents: defaultData as DocumentDataType[] });
        }
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error: ", error);
          setData({ documents: [] });
          setError(error as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  console.log("useFetch: ", data, loading, error);

  return { data, loading, error };
};

export default useFetch;
 */