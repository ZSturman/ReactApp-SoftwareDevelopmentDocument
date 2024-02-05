import { ContentDataT } from "../../types/data";
import "./ContentPreview.scss";


interface ContentPreviewProps {
  contentData: ContentDataT | undefined;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ contentData }) => {

  if (!contentData) {
    return <div>Content not found.</div>;
  }

  // Function to create markup
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <>
    <div
      className="content-preview"
      dangerouslySetInnerHTML={createMarkup(contentData.item)}
    />
    </>
  );
};

export default ContentPreview;
