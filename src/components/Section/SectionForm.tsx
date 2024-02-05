import { useState, useRef } from "react";
import { useDocDataContext } from "../../contexts";
import Contents from "../Content/Contents";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  FaRegTrashCan,
} from "../Shared/ReactIcons";

import "./SectionForm.scss";

interface SectionFormProps {
  sectionId: string;
}

const SectionForm: React.FC<SectionFormProps> = ({ sectionId }) => {
  const { sectionDataManager } = useDocDataContext();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const section = sectionDataManager.getSectionById(sectionId);
  const expandedValue = sectionDataManager.isSectionExpanded(sectionId);

  const toggleExpanded = () => {
    sectionDataManager.setSectionExpanded(sectionId, !expandedValue);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };
  return (
    <>
      {section && (
        <div>
          <div
            className={`section-header ${
              expandedValue ? "expanded" : "collapsed"
            }`}
          >
            <div className="title-and-delete-btn">
              <button
                className="section-delete-btn"
                onClick={() => sectionDataManager.removeSection(section.id)}
              >
                <FaRegTrashCan />
              </button>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    sectionDataManager.changeSectionTitle(
                      section.id,
                      e.target.value
                    )
                  }
                  onBlur={handleInputBlur}
                />
              ) : (
                <div className="section-title" onClick={handleTitleClick}>
                  {section.title}
                </div>
              )}
            </div>
            <button className="section-expander" onClick={toggleExpanded}>
              {expandedValue ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
            </button>
          </div>

          {section.settings.expanded && (
            <div className="section-body">

              <Contents sectionId={section.id} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SectionForm;


/*                 <button
                  className="section-button layout"
                  onClick={() =>
                    sectionDataManager.changeSectionFlowDirection(
                      section.id,
                      !section.settings.flowDirectionRow
                    )
                  }
                >
                  {section.settings.flowDirectionRow ? (
                    <TfiLayoutColumn2 />
                  ) : (
                    <TbLayoutList />
                  )}
                </button> */