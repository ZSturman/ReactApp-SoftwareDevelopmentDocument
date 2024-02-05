import { useDocDataContext } from "../../../contexts";

interface AreYouSureProps {
  setIsDeleting: (isDeleting: boolean) => void;
  chapterId: string;
}

const AreYouSure: React.FC<AreYouSureProps> = ({ setIsDeleting, chapterId }) => {
  const { chapterDataManager } = useDocDataContext();


  return (
    <div>
      <h1>Are you sure?</h1>
      <button onClick={()=>setIsDeleting(false)}>Cancel</button>
      <button onClick={()=>chapterDataManager.removeChapter(chapterId)}>Delete Chapter</button>
    </div>
  );
};

export default AreYouSure;
