import React from "react";
import {
  ChapterDataT,
  SectionDataT,
  SectionPageT,
} from "../../types/data";
import { useDocDataContext } from "../../contexts";
import SectionPreview from "./SectionPreview";
import { useThemeContext } from "../../contexts";
import { ChapterStylesT } from "../../types/theme/ThemeTokens";

interface ChapterPreviewProps {}

const ChapterPreview: React.FC<ChapterPreviewProps> = () => {
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

  const chapterData = doc.chapters.find(
    (chapter: ChapterDataT) => chapter.id === currentPage.chapters?.chapterId
  );

  if (!chapterData) {
    return <div>No chapter found</div>;
  }

  const chapterPageNumber = currentPage.chapters.chapterPageNum;

  const pageSectionIds = currentPage.chapters.sections.map(
    (section: SectionPageT) => section.sectionId
  );

  const matchingSections = chapterData.sections.filter((section) => {
    return pageSectionIds.includes(section.id);
  });

  const mergeStyles = (themeStyles: ChapterStylesT) => {
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
    };
  };

  const style = mergeStyles(theme.chapter);

  return (
    <div className="chapter-preview-container">
      {chapterPageNumber === 1 && (
        <div className="chapter-title" style={style}>
          {chapterData.title}
        </div>
      )}
      {matchingSections.map((sectionPage: SectionDataT) => (
        <SectionPreview key={sectionPage.id} sectionData={sectionPage} />
      ))}
    </div>
  );
};

export default ChapterPreview;
