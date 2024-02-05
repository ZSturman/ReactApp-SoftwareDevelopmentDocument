import { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDocDataContext } from "../../contexts/index";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  FaRegTrashCan,
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignCenter,
  MdOutlineVerticalAlignTop,
  CgArrowAlignV,
} from "../Shared/ReactIcons";
import {
  AreYouSure,
  Contributors,
  UploadLogo,
} from "./DocSettingsComponents";

import Chapters from "../Chapter/Chapters";

import "./DocumentForm.scss";
import "../Sidebar/Sidebar.scss";

interface DocumentFormProps {}

const DocumentForm: React.FC<DocumentFormProps> = () => {
  const {
    doc,
    changeDocTitle,
    changeVerticalAlignment,
  } = useDocDataContext();
  const [expandedValue, setExpandedValue] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTitleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  if (!doc) {
    return <div>No document selected</div>;
  }

  return (
    <div className="document-form-container">
      <div
        className={`doc-container ${expandedValue ? "expanded" : "collapsed"}`}
      >
        <div className="doc-header">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              name="title"
              className="text-input"
              value={doc.title}
              onChange={(e) => changeDocTitle(e.target.value)}
              onBlur={handleInputBlur}
            />
          ) : (
            <div className="doc-title" onClick={handleTitleClick}>
              {doc.title}
            </div>
          )}

          <button
            className="doc-expander"
            onClick={() => {
              setExpandedValue(!expandedValue);
            }}
          >
            {expandedValue ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
          </button>
        </div>

        <div className="doc-body">
          <div className="doc-buttons">
            <button
              className="doc-button delete"
              onClick={() => setIsDeleting(!isDeleting)}
            >
              <FaRegTrashCan />
            </button>
          </div>
          <div className="doc-settings-area">
            {isDeleting && <AreYouSure setIsDeleting={setIsDeleting} />}
          </div>

          <UploadLogo />
          <Contributors />

          <div className="cp-body">
            <div className="doc-body">
              <div className="cover-page-alignment-buttons">
                <button
                  onClick={() => changeVerticalAlignment("stretch")}
                  className={`cover-page-vertical-alignment ${
                    doc.coverPageSettings.verticalAlignment === "stretch"
                      ? "active"
                      : ""
                  }`}
                >
                  <CgArrowAlignV />
                </button>
                <button
                  onClick={() => changeVerticalAlignment("bottom")}
                  className={`cover-page-vertical-alignment ${
                    doc.coverPageSettings.verticalAlignment === "bottom"
                      ? "active"
                      : ""
                  }`}
                >
                  <MdOutlineVerticalAlignBottom />
                </button>
                <button
                  onClick={() => changeVerticalAlignment("center")}
                  className={`cover-page-vertical-alignment ${
                    doc.coverPageSettings.verticalAlignment === "center"
                      ? "active"
                      : ""
                  }`}
                >
                  <MdOutlineVerticalAlignCenter />
                </button>
                <button
                  onClick={() => changeVerticalAlignment("top")}
                  className={`cover-page-vertical-alignment ${
                    doc.coverPageSettings.verticalAlignment === "top"
                      ? "active"
                      : ""
                  }`}
                >
                  <MdOutlineVerticalAlignTop />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DndProvider backend={HTML5Backend}>
          <Chapters />
        </DndProvider>
      </div>
    </div>
  );
};

export default DocumentForm;
