/* 
import "./NoSelectedDocument.scss";

const NoSelectedDocument = () => {

  const createNewDocument = async () => {
    const newDocument = createDocument();
    await addDocument(url, newDocument);
    setDocumentsList([...documentsList, newDocument]);
    setSelectedDocument(newDocument);
  };

  return (
    <div className="no-selected-doc-container">
      <div className="no-selected-doc-header">Select a document</div>
      <div className="no-selected-doc-or">or</div>
      <div className="no-selected-doc-button">
        <button onClick={createNewDocument}>Add New Document</button>
      </div>
    </div>
  );
};

export default NoSelectedDocument;
 */