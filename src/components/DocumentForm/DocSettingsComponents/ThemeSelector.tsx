import { useDocDataContext } from "../../../contexts";

const ThemeSelector = () => {
  const { doc, changeDocTheme, enableCoverPage } = useDocDataContext();

  if (!doc) {
    return <div>No document selected</div>;
  }



  return (
    <div>
      <div className="field-container">
        <label htmlFor="theme" className="field-label">
          Theme
        </label>
        <select
          name="theme"
          className="select-input"
          value={doc.settings.theme}
          onChange={(e) => changeDocTheme(e.target.value)}
        >
          <option value="pdf">PDF</option>
          <option value="web">Web</option>
        </select>
      </div>

      <input
            type="checkbox"
            checked={doc.coverPageSettings.enabled}
            onChange={() =>
              enableCoverPage(!doc.coverPageSettings.enabled)
            }
          />



    </div>
  );
};

export default ThemeSelector;
