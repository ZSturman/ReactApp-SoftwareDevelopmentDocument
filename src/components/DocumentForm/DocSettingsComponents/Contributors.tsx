import { useDocDataContext } from "../../../contexts";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import "./Contributors.scss";

const Contributors = () => {
  const { doc, addContributor, removeContributor, editContributors } =
    useDocDataContext();

  if (!doc) {
    return <>No document selected</>;
  }

  return (
    <div className="contributors-section">
      <div className="contributors-list">
        {Array.isArray(doc.contributors) &&
          doc.contributors.map((contributor) => (
            <div className="contributor" key={contributor.id}>
              <div className="input-boxes">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="text-input"
                  value={contributor.name}
                  onChange={(e) =>
                    editContributors(
                      contributor.id,
                      e.target.name,
                      e.target.value
                    )
                  }
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="text-input"
                  value={contributor.role}
                  onChange={(e) =>
                    editContributors(
                      contributor.id,
                      e.target.name,
                      e.target.value
                    )
                  }
                />
              </div>
              <button
                className="icon-button remove-button"
                onClick={() => removeContributor(contributor.id)}
              >
                <MdOutlineRemoveCircleOutline />
              </button>
            </div>
          ))}

        <button
          className="icon-button add-button"
          onClick={() => addContributor()}
        >
          <IoMdPersonAdd />
        </button>
      </div>
    </div>
  );
};

export default Contributors;
