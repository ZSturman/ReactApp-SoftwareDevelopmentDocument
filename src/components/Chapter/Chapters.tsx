import ChapterForm from "./ChapterForm";
import DragAndDrop from "./DragAndDrop";
import { ChapterDataT } from "../../types/data";

import { useDocDataContext } from "../../contexts";

import "./ChapterForm.scss";
//import { generateRandomID } from "../../utils";

interface ChaptersProps {}

const Chapters: React.FC<ChaptersProps> = () => {
  const { chapterDataManager, docPreviewManager } = useDocDataContext();

  if (!chapterDataManager.chapters) {
    return <div>No chapters found</div>;
  }

  const addNewChapter = () => {
    chapterDataManager.addChapter();
    docPreviewManager.setDocPagesBasedOnChapters(chapterDataManager.chapters)
  };

  return (
    <div>
      <button className="add-chapter-btn" onClick={addNewChapter}>
        + Add Chapter
      </button>

      {chapterDataManager.chapters.map(
        (chapter: ChapterDataT, index: number) => (
          <DragAndDrop
            key={chapter.id}
            id={chapter.id}
            index={index}
            handleListChange={chapterDataManager.reorderChapters}
          >
            <ChapterForm key={chapter.id} chapterId={chapter.id} />
          </DragAndDrop>
        )
      )}
    </div>
  );
};

export default Chapters;
