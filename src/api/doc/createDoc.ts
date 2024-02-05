import { DocDataT } from "../../types/data";

export const createDocApi = async (url: string, newDocument: DocDataT) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDocument),
    });
    if (!response.ok) {
      throw new Error("Failed to add new document");
    }
    // TODO: check if this response is necessary
    //const addedDocument = await response.json();
  } catch (error) {
     // TODO: Implement proper error handling
    console.error("Error adding document:", error);
  }
};
