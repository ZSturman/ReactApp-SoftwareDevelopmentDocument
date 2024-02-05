import React from "react";
import { SectionDataT, SectionPageT } from "../../types/data";
import ContentPreview from "./ContentPreview"; // Ensure this component is properly implemented
import { useThemeContext } from "../../contexts";
import { useDocDataContext } from "../../contexts";

import "./SectionPreview.scss";
import { SectionStylesT } from "../../types/theme/ThemeTokens";

interface SectionPreviewProps {
  sectionData: SectionDataT;
}

const SectionPreview: React.FC<SectionPreviewProps> = ({ sectionData }) => {
  const { doc, currentPage } = useDocDataContext();
  const { theme } = useThemeContext();

  if (!doc) {
    return <div>No document selected</div>;
  }

  if (!currentPage) {
    return <div>No current page</div>;
  }

  if (!currentPage.chapters) {
    return <div>No chapters found</div>;
  }

  const chapterId = currentPage.chapters.chapterId;

  const sectionContents = currentPage.chapters.sections.flatMap(
    (section: SectionPageT) =>
      section.contents.map((content) => content.contentId)
  );

  const selectedSection = doc?.chapters
    .find((chapter) => chapter.id === chapterId)
    ?.sections.find((section) => section.id === sectionData.id);

  if (!selectedSection) {
    return <div>No section found</div>;
  }

  // Filter the contents of the selected section based on the flattened array of contentIds
  const contentItems = selectedSection.contents.filter((content) =>
    sectionContents.includes(content.id)
  );

  const mergeStyles = (themeStyles: SectionStylesT) => {
    // Convert the FourSideTokensDataT for margin and padding into a CSS string
    const marginString = `${themeStyles.margin.top}px ${themeStyles.margin.right}px ${themeStyles.margin.bottom}px ${themeStyles.margin.left}px`;
    //const paddingString = `${themeStyles.padding.top}px ${themeStyles.padding.right}px ${themeStyles.padding.bottom}px ${themeStyles.padding.left}px`;

    return {
      fontSize: `${themeStyles.font.size}px`,
      fontWeight: themeStyles.font.weight,
      lineHeight: `${themeStyles.font.lineHeight}`,
      color: themeStyles.font.color,
      //textAlign: themeStyles.font.textAlign,
      //textShadow: themeStyles.font.textShadow,
      //textTransform: themeStyles.font.textTransform,
      textDecoration: themeStyles.font.textDecoration,
      fontFamily: themeStyles.font.fontFamily,
      margin: marginString,
      //padding: paddingString,
      backgroundColor: themeStyles.backgroundColor,
      border: `${themeStyles.border.width}px ${themeStyles.border.style} ${themeStyles.border.color}`,
      borderRadius: `${themeStyles.border.radius}px`,
      // Add other properties or conversions if needed
    };
  };

  const style = mergeStyles(theme.section);

  return (
    <div className={`section-preview`}>
      <div style={style}>{sectionData.title}</div>
      <div
        className={`${
          sectionData.settings.flowDirectionRow ? "row" : "column"
        }`}
      >
        {contentItems.map((contentItem) => (
          <ContentPreview key={contentItem.id} contentData={contentItem} />
        ))}
      </div>
    </div>
  );
};

export default SectionPreview;
