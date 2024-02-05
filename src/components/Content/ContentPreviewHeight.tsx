import React, { useEffect, useRef } from "react";
import { useThemeContext } from "../../contexts";
import { ContentDataT } from "../../types/data";
import { ThemeTokensDataT } from "../../types/theme/ThemeTokens";
import { useDocDataContext } from "../../contexts";

interface ContentPreviewHeightProps {
  contentData: ContentDataT;
  heightUpdated: boolean;
  setHeightUpdated: (heightUpdated: boolean) => void;
}

const ContentPreviewHeight: React.FC<ContentPreviewHeightProps> = ({
  contentData,
  setHeightUpdated,
}) => {
  const { docPreviewManager, contentDataManager } = useDocDataContext();
  const { theme } = useThemeContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentData && contentRef.current) {
      const actualHeight = contentRef.current.clientHeight;
      console.log(
        `Content Height: ${contentData.height} to Actual Height: ${actualHeight}`
      );
      if (contentData.height !== actualHeight) {

        contentDataManager.changeContentHeight(contentData.id, actualHeight);
        setHeightUpdated(true);
      } 
      
    }
  }, [contentData, contentDataManager, setHeightUpdated]);
  



  if (!contentData) {
    return <div>Content not found.</div>;
  }

  if (!docPreviewManager.isDimensionsLoaded) {
    return <div>Loading content dimensions...</div>;
  }

  // Function to create markup
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const measureHeightStyles = (themeStyle: ThemeTokensDataT) => {
    const paddingSides =
      themeStyle.contentItem.padding.left +
      themeStyle.contentItem.padding.right;
    const marginSides =
      themeStyle.contentItem.margin.left + themeStyle.contentItem.margin.right;
    const widthOfPage = themeStyle.page.width - paddingSides - marginSides;

    return {
      width: widthOfPage,
    };
  };

  const widthOfPage = measureHeightStyles(theme);

  if (widthOfPage.width === 0) {
    // Fetch and display data from dataContextManager
    return <div>...Data from dataContextManager...</div>;
  }

  return (
    <div
      ref={contentRef}
      style={widthOfPage}
      dangerouslySetInnerHTML={createMarkup(contentData.item)}
    />
  );
};

export default ContentPreviewHeight;
