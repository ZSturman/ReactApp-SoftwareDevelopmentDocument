import { useState } from "react";
import { useDocDataContext } from "../../../contexts";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,

} from "../../Shared/ReactIcons";
import "./CoverPageForm.scss";

const CoverPageForm = () => {
  const {
    doc,

  } = useDocDataContext();

  const [expandedValue, setExpandedValue] = useState<boolean>(false);

  if (!doc) {
    return <div>No document selected</div>;
  }

  // TODO: changeCoverPageLayout - drag and drop logo, title contributors as long as they are enabled¸

  return (
    <div className="cover-page-container">
      <div
        className={`cp-container ${expandedValue ? "expanded" : "collapsed"}`}
      >
        <div className="cp-header">
          <div className="cp-title">Cover Page</div>
          <button
            className="cp-expander"
            onClick={() => {
              setExpandedValue(!expandedValue);
            }}
          >
            {expandedValue ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
          </button>
        </div>


      </div>
    </div>
  );
};

export default CoverPageForm;
