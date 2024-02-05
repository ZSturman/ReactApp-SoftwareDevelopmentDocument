import {fetchData, sortDocuments, deleteChecker} from "./utilities/index.js";

const url = "http://localhost:8000/documents";

const sortAndLogData = async (url) => {
  try {
    const data = await fetchData(url);
    const sortedData = sortDocuments(data, "alphabetical", false);
    console.log(sortedData);
  } catch (error) {
    console.error("Error fetching, sorting, and logging data:", error);
  }
};

const deleteAndLogData = async (url) => {
  try {
    const data = await fetchData(url);
    await deleteChecker(data);
    const updatedData = await fetchData(url);
    console.log(updatedData);
  } catch (error) {
    console.error("Error deleting and logging data:", error);
  }
};

deleteAndLogData(url);
sortAndLogData(url);
