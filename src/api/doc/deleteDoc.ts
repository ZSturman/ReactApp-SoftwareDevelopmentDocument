export const deleteDocApi = async (url: string, docId: string) => {
    url = `${url}/${docId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete document");
      }
      //TODO: check if this response is necessary
      //const deletedDocument = await response.json();
    } catch (error) {
        //TODO: Implement proper error handling
      console.error("Error deleting document:", error);
    }
  };