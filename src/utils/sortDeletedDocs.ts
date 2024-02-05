import { DocDataT } from "../types/data";


export const sortDocuments = (
  activeDocs: DocDataT[],
  sortBy: string = "dateUpdated",
  ascending: boolean = true,
) => {
  
  // Sort the filteredDocuments array
  const sortedDocuments = [...activeDocs];
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
};




export const sortDeletedDocs = (docs: DocDataT[]) => {
  const activeDocs = [...docs.filter((doc) => doc.settings.isDeleted === false)]
  const rubbishBin = [];
  const setToDelete = [];

  rubbishBin.push(...docs.filter((doc) => doc.settings.isDeleted === true));
  setToDelete.push(
    ...rubbishBin.filter(
      (doc) => doc.settings.dateUpdated <= Date.now() - 30 * 24 * 60 * 60 * 1000
    )
  );

  return { activeDocs, rubbishBin, setToDelete };
};
