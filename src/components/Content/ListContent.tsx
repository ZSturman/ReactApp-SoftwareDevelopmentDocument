/* import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import quill styles
import { ContentDataT } from "../../types/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useDocDataContext } from "../../contexts";
import "./ListContent.scss";

interface ListContentProps {
  content: ContentDataT;
}

const ListContent: React.FC<ListContentProps> = ({ content }) => {
  const { contentDataManager } = useDocDataContext();

  // Method to handle the change in list item
  const handleListItemChange = (index: number, value: string) => {
    contentDataManager.editListItem(content.id, index, value);
  };

  // Method to handle adding a new list item
  const addListItemAtIndex = (index: number) => {
    contentDataManager.addListItem(content.id, index);
  };

  // Method to handle removing a list item
  const removeListItem = (index: number) => {
    contentDataManager.removeListItem(content.id, index);
  };

  return (
    <>
      <div className="list-section">
        <div className="list-items">
          {Array.isArray(content.items) &&
            content.items.map((listItem, index) => (
              <div className="list-item" key={index}>
                <div className="list-item-input">
                  <ReactQuill
                    value={listItem}
                    onChange={(content, delta, source, editor) =>
                      handleListItemChange(index, editor.getHTML())
                    }
                  />
                </div>
                <div className="list-item-buttons">
                  <button
                    className="list-item-btn remove"
                    onClick={() => removeListItem(index)}
                  >
                    <MdOutlineRemoveCircleOutline />
                  </button>
                  <button
                    className="list-item-btn add"
                    onClick={() => addListItemAtIndex(index)}
                  >
                    <IoMdAddCircleOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListContent;



/* import { ContentDataT } from "../../types/data";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useDocDataContext } from "../../contexts";

import "./ListContent.scss";

interface ListContentProps {
  content: ContentDataT;
}

const ListContent: React.FC<ListContentProps> = ({ content }) => {
  const { contentDataManager } = useDocDataContext();

  // Method to handle the change in list item
  const handleListItemChange = (index: number, value: string) => {
    contentDataManager.editListItem(content.id, index, value);
  };

  // Method to handle adding a new list item
  const addListItemAtIndex = (index: number) => {
    contentDataManager.addListItem(content.id, index);
  };

  // Method to handle removing a list item
  const removeListItem = (index: number) => {
    contentDataManager.removeListItem(content.id, index);
  };

  return (
    <>
      <div className="list-section">
        <div className="list-items">
          {Array.isArray(content.items) &&
            content.items.map((listItem, index) => (
              <div className="list-item" key={index}>
                <div className="list-item-input">
                  <input
                    type="text"
                    name="text"
                    value={listItem}
                    onChange={(e) =>
                      handleListItemChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="list-item-buttons">
                  <button
                    className="list-item-btn remove"
                    onClick={() => removeListItem(index)}
                  >
                    <MdOutlineRemoveCircleOutline />
                  </button>
                  <button
                    className="list-item-btn add"
                    onClick={() => addListItemAtIndex(index)}
                  >
                    <IoMdAddCircleOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListContent;
 */ 