import { DocDataT } from "../../types/data"
export const updateDocApi = async (
  url: string,
  updatedDoc: DocDataT,
) => {
  url = `${url}/${updatedDoc.id}`;
  updatedDoc = {
    ...updatedDoc,
    settings: { ...updatedDoc.settings, dateUpdated: Date.now() },
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDoc),
    });

    if (!response.ok) {
      throw new Error("Failed to update document");
    }

    // Optionally, return the updated document or a success message
    const data = await response.json();
    return data; // or return { status: 'success', data };
  } catch (error) {
    // You can handle the error here or throw it to be caught by the caller
    console.error("Error updating document:", error);
    throw error; // or return { status: 'error', error };
  }
};
