import { useDocDataContext } from "../../contexts";
import "./AlignmentButtons.scss";

import {
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
} from "react-icons/rx";

interface AlignmentButtonsProps {
  itemId: string;
  currentAlignment: string;
}

const AlignmentButtons: React.FC<AlignmentButtonsProps> = ({
  itemId,
  currentAlignment,
}) => {
  const { chapterDataManager } = useDocDataContext();


  return (
    <div className="alignment-buttons-container">
      <button
        className={`alignment-button ${
          currentAlignment === "left" ? "active" : ""
        }`}
        onClick={() => chapterDataManager.changeChapterHeaderAlignment(itemId, "left")}
      >
        <RxTextAlignLeft />
      </button>
      <button
        className={`alignment-button ${
          currentAlignment === "center" ? "active" : ""
        }`}
        onClick={() => chapterDataManager.changeChapterHeaderAlignment(itemId, "center")}
      >
        <RxTextAlignCenter />
      </button>
      <button
        className={`alignment-button ${
          currentAlignment === "right" ? "active" : ""
        }`}
        onClick={() => chapterDataManager.changeChapterHeaderAlignment(itemId, "right")}
      >
        <RxTextAlignRight />
      </button>
    </div>
  );
};

export default AlignmentButtons;
