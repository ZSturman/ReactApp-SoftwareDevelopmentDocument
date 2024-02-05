import { useDocDataContext } from "../../../contexts";

interface AreYouSureProps {
  setIsDeleting: (isDeleting: boolean) => void;
}

const AreYouSure: React.FC<AreYouSureProps> = ({setIsDeleting}) => {
  const { doc, removeDoc } = useDocDataContext();

  const imSure = (id: string) => {
    removeDoc(id);
    setIsDeleting(false)
  }

  return (
    <div>
      {doc && (
        <>
          <h1>Are you sure?</h1>
          <button onClick={()=>setIsDeleting(false)}>Cancel</button>
          <button onClick={() => imSure(doc.id)}>Delete Document</button>
        </>
      )}
    </div>
  );
};

export default AreYouSure;
