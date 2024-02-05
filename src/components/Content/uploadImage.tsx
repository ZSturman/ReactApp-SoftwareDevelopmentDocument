/* import { ContentDataT } from "../../types/data";
import { useDocDataContext } from "../../contexts";

interface UploadAndDisplayImageProps {
  content: ContentDataT;
}

const UploadAndDisplayImage: React.FC<UploadAndDisplayImageProps> = ({
  content,
}) => {
  const { contentDataManager } = useDocDataContext();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        contentDataManager.updateImageItem(content.id, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="preview-content-image-container">
      {!(content.item === "") && (
        <div >
          <img className="preview-content-image" alt="Uploaded" src={content.item} />
        </div>
      )}

      <input type="file" name="myImage" onChange={handleImageChange} />
    </div>
  );
};

export default UploadAndDisplayImage; */