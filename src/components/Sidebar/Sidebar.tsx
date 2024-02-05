import { useState } from "react";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

import { CiViewList } from "../Shared/ReactIcons";

import DocumentsList from "../DocumentList/DocumentList";
import DocumentForm from "../DocumentForm/DocumentForm";
import "./Sidebar.scss";

const Sidebar = () => {
  const [showDocList, setShowDocList] = useState<boolean>(true);
  const [showDocForm, setShowDocForm] = useState<boolean>(true);

  const toggleSidebar = () => {
    setShowDocList(true);
    setShowDocForm(true);
  };

  return (
    <div className="sidebar-container">
      {(showDocList || showDocForm) && (
        <div className="sidebar-toolbar">
          {/* DOC LIST */}
          <button
            className={`sidebar-btn toggle-doc-list ${
              showDocList ? "active" : ""
            }`}
            onClick={() => setShowDocList(!showDocList)}
          >
            <CiViewList />
          </button>

          {/* DOC FORM */}
          <button
            className={`sidebar-btn toggle-doc-form ${
              showDocForm ? "active" : ""
            }`}
            onClick={() => setShowDocForm(!showDocForm)}
          >
            <TbLayoutSidebarLeftCollapseFilled />
          </button>
        </div>
      )}

      <div className="sidebar-body">
        {!showDocList && !showDocForm && (
          <button className="sidebar-btn show" onClick={toggleSidebar}>
            <TbLayoutSidebarLeftExpandFilled />
          </button>
        )}

        {showDocList && (
          <>
            <DocumentsList />
          </>
        )}
        {showDocForm && <DocumentForm />}
      </div>
    </div>
  );
};

export default Sidebar;
