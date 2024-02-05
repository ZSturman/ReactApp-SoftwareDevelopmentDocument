import { ChapterDataT, SectionDataT, ContentDataT } from "../types/data";
import { ChapterPageT, SectionPageT, ContentPageT } from "../types/data";
import { generateRandomID } from "./generateRandomID";
import { ThemeTokensDataT } from "../types/theme/ThemeTokens";

function checkContentHeight(content: ContentDataT[], theme: ThemeTokensDataT, tempH: number, pageNum: number = 1): [ContentPageT[], ContentDataT[], number, number] {
 
  const contentFit: ContentPageT[] = [];
  const contentDidntFit: ContentDataT[] = [];
  let contentHeightToAdd = 0;

  for (const item of content) {
    contentHeightToAdd = item.height 
    console.log(item.id,contentHeightToAdd)
    console.log(tempH + contentHeightToAdd, theme.page.height)

    if (contentHeightToAdd > theme.page.height) {
      console.log("Content height is greater than page height")
    }


    if (tempH + contentHeightToAdd < theme.page.height) {
      tempH += contentHeightToAdd;
      const newContentPageItem: ContentPageT = {
        id: generateRandomID(),
        contentPageNum: pageNum,
        contentId: item.id,
        contentHeight: contentHeightToAdd,
      };
      contentFit.push(newContentPageItem);
    } else {
      contentDidntFit.push(item);
      tempH -= contentHeightToAdd;
      break;
    }
  }
  const pageFilledPercentage = (tempH / theme.page.height) * 100;
  return [contentFit, contentDidntFit, tempH, pageFilledPercentage];
}


function checkSectionHeight(sections: SectionDataT[], theme: ThemeTokensDataT, tempH: number): [SectionPageT[], SectionDataT[], number] {
  const sectionFit: SectionPageT[] = [];
  const sectionDidntFit: SectionDataT[] = [];

  for (const section of sections) {
    if (theme.section.font.size > theme.page.height) {
      continue; 
    }

    tempH += theme.section.font.size

    if (tempH < theme.page.height) {
      const [contentFit, contentDidntFit, newTempH, pageFilledPercentage] = checkContentHeight(section.contents, theme, tempH);

      

      tempH = newTempH;

      const newSectionPageitem: SectionPageT = {
        id: generateRandomID(),
        sectionPageNum: 1,
        sectionId: section.id,
        contents: contentFit,
        sectionHeight: theme.section.font.size,
      };

      sectionFit.push(newSectionPageitem);

      if (contentDidntFit.length > 0 && pageFilledPercentage < 90) {
        sectionDidntFit.push(section, ...sections.slice(sections.indexOf(section) + 1));
        break;
      } else if (contentDidntFit.length > 0 && pageFilledPercentage >= 90) {
        const newSection: SectionDataT = {
          ...section,
          contents: contentDidntFit,
        };
        const remainingPages = checkSectionHeight([newSection], theme, 0);
        sectionFit.push(...remainingPages[0]);
        break;
      }
    } else {
      sectionDidntFit.push(section, ...sections.slice(sections.indexOf(section) + 1));
      break;
    }
  }

  return [sectionFit, sectionDidntFit, tempH];
}


export const checkChapterHeight = (chapter: ChapterDataT, theme: ThemeTokensDataT, iteration: number = 0): ChapterPageT[] => {
  if (!theme.page.height || theme.page.height === 0) {
    return [];
  }

  const chapterTitleH = theme.chapter.font.size
  let tempH = iteration === 0 ? chapterTitleH : 0;
  iteration += 1;

  tempH += theme.page.padding.top + theme.page.padding.bottom + theme.page.margin.top + theme.page.margin.bottom + theme.chapter.padding.top + theme.chapter.padding.bottom + theme.chapter.margin.top + theme.chapter.margin.bottom


  const chPages: ChapterPageT[] = [];

  const [sectionFit, sectionDidntFit, tempHAfterSections] = checkSectionHeight(chapter.sections, theme, tempH);

  const newPage: ChapterPageT = {
    id: generateRandomID(),
    chapterPageNum: iteration,
    chapterId: chapter.id,
    sections: sectionFit,
    chapterHeight: tempHAfterSections,
  };

  chPages.push(newPage);

  if (sectionDidntFit.length === 0) {
    return chPages;
  }

  // Handle sections that didn't fit by creating new pages
  if (sectionDidntFit.length > 0) {
    const nextChapterPage: ChapterDataT = {
      ...chapter,
      sections: sectionDidntFit,
    };

    const remainingPages = checkChapterHeight(nextChapterPage, theme, iteration);
    // Add the newly created pages to the current chapter pages
    chPages.push(...remainingPages);
  }

  return chPages;
};
