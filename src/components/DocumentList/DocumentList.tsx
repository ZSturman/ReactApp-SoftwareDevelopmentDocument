import { useState } from "react";
import { useDocDataContext } from "../../contexts";
import { daysTilDeletion, sortDocuments } from "../../utils";
import { IoMdArrowDropup, IoMdArrowDropright } from "../Shared/ReactIcons"
 

import "./DocumentList.scss";

interface DocumentsListProps {}

const DocumentsList: React.FC<DocumentsListProps> = () => {
  const [showDeletedDocs, setShowDeletedDocs] = useState<boolean>(false);
  const { setDoc, activeDocs, addDoc, deleteDoc, rubbishBin, putBackDoc } =
    useDocDataContext();

  const sortedDocs = sortDocuments(activeDocs, "dateUpdated", false);

  return (
    <div>
      <div className="documents-list">
        {sortedDocs.map((d) => (
          <div key={d.id} className="documents-list-item">
            <button className="document-list-title" onClick={() => setDoc(d)}>
              {d.title}
            </button>
          </div>
        ))}
      </div>

      <div>
        <button className="add-document-btn" onClick={addDoc}>+ Add Document</button>
      </div>

      <hr />

      {!showDeletedDocs && (
        <div className="show-hide-deleted">
          <button
            className="show-hide-deleted-button"
            onClick={() => setShowDeletedDocs(true)}
          >
            Show deleted
            <IoMdArrowDropright/>
          </button>
        </div>
      )}

      {showDeletedDocs && (
        <>
          {/* //TODO: if rubbishBin is empty output "no deleted documents"  */}
          {rubbishBin.length === 0 && (
            <div className="no-rubbish-text">
              <i>Rubbish bin is empty</i>
            </div>
          )}
          {rubbishBin.map((d) => (
            <div key={d.id} className="deleted-document">
              <hr />

              <div className="document-title">{d.title}</div>
              <div className="document-status">
                will delete in {daysTilDeletion(d.settings.dateUpdated)} days
              </div>
              <div className="deleted-document-buttons">
                <button onClick={() => putBackDoc(d.id)}>Put back</button>
                <button onClick={() => deleteDoc(d.id)}>Delete now</button>
              </div>
            </div>
          ))}

          <div className="show-hide-deleted">
            <button
              className="show-hide-deleted-button"
              onClick={() => setShowDeletedDocs(false)}
            >
              Hide deleted
              <IoMdArrowDropup />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentsList;

/* 

  const deleteNow = async (id: string) => {
    await deleteDocument(url, id);
    setDocumentsList(documentsList.filter((document) => document.id !== id));
    setDeletedDocuments(deletedDocuments.filter((document) => document.id !== id));
    setNotDeletedDocuments(notDeletedDocuments.filter((document) => document.id !== id));
  };

  const deleteDocumentNow = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the document? This action cannot be undone."
    );
    if (confirmDelete) {
      deleteNow(id);
    }
  };

  const createNewDocument = async () => {
    const newDocument = createDocument();
    await addDocument(url, newDocument);
    setDocumentsList([...documentsList, newDocument]);
    setSelectedDocument(newDocument);
    setNotDeletedDocuments([...notDeletedDocuments, newDocument]);
  };

  const addThirtyDays = (date: number) => {
    const deleteDate = new Date(date + 30 * 24 * 60 * 60 * 1000);
    const currentDate = new Date();
    const timeDiff = deleteDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff.toString();
  };

  const putDocumentBack = async (document: DocumentDataType) => {
    const updatedDocument = {
      ...document,
      settings: {
        ...document.settings,
        isDeleted: false,
      },
    };
    updateDocument(url, updatedDocument);
    setNotDeletedDocuments([...notDeletedDocuments, updatedDocument]);
    setDeletedDocuments(
      deletedDocuments.filter((deletedDocument) => deletedDocument.id !== document.id)
    );
    setSelectedDocument(updatedDocument);
  }; */
