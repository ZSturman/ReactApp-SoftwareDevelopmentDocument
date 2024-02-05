import Content from "./Content";
import { PiTextTBold } from "react-icons/pi";
import DragAndDrop from "../Chapter/DragAndDrop";
import { useDocDataContext } from "../../contexts";
import "./Contents.scss";

interface ContentsProps {
  sectionId: string;
}

const Contents: React.FC<ContentsProps> = ({ sectionId }) => {
  const { contentDataManager } = useDocDataContext();

  const contents = contentDataManager.getContentsBySectionId(sectionId);



  return (
    <>
      {contents.map((content, index) => (
        <div className="content-item" key={content.id}>
          <DragAndDrop
            id={content.id}
            index={index}
            handleListChange={contentDataManager.reorderContent}
          >
            <Content content={content} />
          </DragAndDrop>
        </div>
      ))}

      <div className="content-buttons">
        <button
          className="content-button text"
          onClick={() => contentDataManager.addContent(sectionId, "text")}
        >
          <PiTextTBold />
        </button>
      

      </div>
    </>
  );
};

export default Contents;
