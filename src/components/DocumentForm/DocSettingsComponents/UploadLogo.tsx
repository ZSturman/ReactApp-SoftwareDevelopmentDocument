import { useDocDataContext } from "../../../contexts";
import "./UploadLogo.scss";

interface UploadLogoProps {}

const UploadLogo: React.FC<UploadLogoProps> = () => {
  const { doc, changeDocLogo, removeDocLogo } = useDocDataContext();

  if (!doc) {
    return (
      <div>
        <h1>Select a new document</h1>
      </div>
    );
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        changeDocLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="preview-content-image-container">
      {!(doc.logo === "") && (
        <div>
          <img className="preview-content-image" alt="Uploaded" src={doc.logo ?? ""} />
          <button onClick={removeDocLogo}>Remove</button>
        </div>
      )}

      <input type="file" name="myImage" onChange={handleImageChange} />
    </div>
  );

};

export default UploadLogo;

