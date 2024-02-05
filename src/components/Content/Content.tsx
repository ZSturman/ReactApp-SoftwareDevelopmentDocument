import ReactQuill from "react-quill";
import { ContentDataT } from "../../types/data";
import { useDocDataContext } from "../../contexts";
import "./Contents.scss";
import DOMPurify from "dompurify";
import ContentPreviewHeight from "./ContentPreviewHeight";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';

interface ContentProps {
  content: ContentDataT;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  const { contentDataManager } = useDocDataContext();
  const [heightUpdated, setHeightUpdated] = useState(false);

  useEffect(() => {
    if (content.item !== "" && content.height === 0) {
      setHeightUpdated(false);
    } 
  }, []);

  const modules = {
    toolbar: [
      { size: ["small", false, "large", "huge"] },
      "bold",
      "italic",
      "underline",
      "strike",
      { list: "bullet" },
      { list: "ordered" },
      "blockquote",
      "image",
    ].filter(Boolean),
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "ordered",
    "blockquote",
    "image",
  ].filter(Boolean) as string[];

  const cleanContent = (contentItem: string) => {
    return contentItem.replace(/<p><br><\/p><p><br><\/p>/g, "<p><br></p>");
  };

  return (
    <div className="content-container">
      <ReactQuill
      theme="snow"
        value={DOMPurify.sanitize(cleanContent(content.item))}
        modules={modules}
        formats={formats}
        onChange={(item, delta, source, editor) =>
          contentDataManager.changeContentItem(
            content.id,
            DOMPurify.sanitize(editor.getHTML())
          )
        }
      />
      <div className="content-preview-height ">

      
        <ContentPreviewHeight
          contentData={content}
          heightUpdated={heightUpdated}
          setHeightUpdated={setHeightUpdated}
        />
        </div>
      <button onClick={() => contentDataManager.removeContent(content.id)}>
        Remove
      </button>
    </div>
  );
};

export default Content;
