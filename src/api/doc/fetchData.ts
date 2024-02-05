import {createDocApi} from "./createDoc"
import { generateRandomID } from "../../utils";
import { defaultDocData, defaultChapterData, defaultContentData, defaultSectionData } from "../../defaults/data"

export const fetchDataApi = async (url: string) => {
  //console.log("fetchDataApi called with URL:", url);  // Log when the function is called
  try {
    const response = await fetch(url);
    console.log('Response Status:', response.status); 
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Not JSON format");
    }

    const data = await response.json();
    //console.log("Data received:", data);  // Log the received data
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log("No data or not in expected format");
      console.log("Creating new document")
      const newContent = { ...defaultContentData, id: generateRandomID() };
      const newSection = { ...defaultSectionData, id: generateRandomID(), title: "Section title", contents: [newContent] };
      const newChapter = { ...defaultChapterData, id: generateRandomID(), title: "Chapter Title", sections: [newSection] };
      const newDoc = { ...defaultDocData, id: generateRandomID(), title: "Doc Title", chapters: [newChapter] };
      await createDocApi(url, newDoc);
      return [newDoc];
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
