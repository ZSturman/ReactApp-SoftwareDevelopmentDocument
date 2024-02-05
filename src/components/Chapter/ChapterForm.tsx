import { useState, useRef } from "react";
import Sections from "../Section/Sections";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  BsPlusSquare,
  FaRegTrashCan,
} from "../Shared/ReactIcons";
import { useDocDataContext } from "../../contexts";
import "./ChapterForm.scss";

interface ChapterFormProps {
  chapterId: string;
}

const ChapterForm: React.FC<ChapterFormProps> = ({ chapterId }) => {
  const { chapterDataManager, sectionDataManager } = useDocDataContext();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select(); // Select all text inside the input
      }
    }, 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const chapter = chapterDataManager.getChapterById(chapterId);

  if (!chapter) return null;

  const expandedValue: boolean =
    chapterDataManager.isChapterExpanded(chapterId);

  return (
    <div className="">
      {chapter && (
        <div
          className={`ch-container ${expandedValue ? "expanded" : "collapsed"}`}
        >
          <div className="ch-header">
            <button
              className="chapter-delete-btn"
              onClick={() => chapterDataManager.removeChapter(chapterId)}
            >
              <FaRegTrashCan />
            </button>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                className="title-input"
                value={chapter.title}
                onChange={(e) =>
                  chapterDataManager.changeChapterTitle(
                    chapter.id,
                    e.target.value
                  )
                }
                onBlur={handleInputBlur}
              />
            ) : (
              <div className="ch-title" onClick={handleTitleClick}>
                {chapter.title}
              </div>
            )}
            <button
              className="ch-expander"
              onClick={() => {
                chapterDataManager.setChapterExpanded(
                  chapter.id,
                  !chapter.settings.expanded
                );
              }}
            >
              {expandedValue ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </button>
          </div>

          {expandedValue && (
            <div className="ch-body">
              <Sections currentChapter={chapter.id} />

              <button
                className="chapter-button add-section"
                onClick={() => sectionDataManager.addSection(chapter.id)}
              >
                <BsPlusSquare /> Section
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterForm;
