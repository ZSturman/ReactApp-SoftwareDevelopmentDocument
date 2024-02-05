import { useState, useEffect, useRef } from "react";
import { useDocDataContext } from "../../contexts";
import CoverPagePreview from "./CoverPagePreview";
import ChapterPreview from "./ChapterPreview";
import PreviewWindowPaginationArrows from "./PreviewWindowPaginationArrows";
import "./PreviewDocument.scss";
import { ChapterDataT, CoverPageSettingsDataT } from "../../types/data";
import { defaultThemeTokens } from "../../defaults/theme/defaultTheme";

const PreviewDocument: React.FC = () => {
  const { doc, theme, currentPage, updateTheme, docPreviewManager } = useDocDataContext();

  const [chToDisplay, setChToDisplay] = useState<ChapterDataT | null>(null);

  const pdfPageRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: theme.page.width,
    height: theme.page.height,
  });

  useEffect(() => {
    if (pdfPageRef.current) {
      setDimensions({
        width: pdfPageRef.current.offsetWidth,
        height: pdfPageRef.current.offsetHeight,
      });
    }
  }, [pdfPageRef]);

  useEffect(() => {
    const handleResize = () => {
      if (pdfPageRef.current) {
        setDimensions({
          width: pdfPageRef.current.offsetWidth,
          height: pdfPageRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateTheme({
      page: {
        ...defaultThemeTokens.page,
        width: dimensions.width,
        height: dimensions.height,
      },
    });
    docPreviewManager.setIsDimensionsLoaded(true);
  }, [dimensions, updateTheme]);

  useEffect(() => {
    if (doc && currentPage && currentPage.docOrder > 1) {
      const chapterId = currentPage?.chapters?.chapterId;

      if (!chToDisplay || chToDisplay.id !== chapterId) {
        const foundChapter = doc.chapters.find(
          (chapter) => chapter.id === chapterId
        );

        if (foundChapter) {
          setChToDisplay(foundChapter);
        } else {
          setChToDisplay(null);
        }
      }
    } else {
      setChToDisplay(null);
    }
  }, [doc, currentPage, chToDisplay]);

  if (!doc) {
    return <div>No document selected</div>;
  }

  if (!currentPage) {
    return <div>Loading current page...</div>;
  }

  const isCoverPage = currentPage.docOrder === 1;
  const chapterPageStyles = {
    paddingTop: theme.page.padding.top,
    paddingBottom: theme.page.padding.bottom,
    paddingLeft: theme.page.padding.left,
    paddingRight: theme.page.padding.right,
    backgroundColor: theme.page.backgroundColor,
  };

  return (
    <div className="preview-window-and-panel">
      <div className="preview-window">
        <div className="document-title">{doc.title}</div>
        <div className="pagination-arrows">
          <PreviewWindowPaginationArrows />
        </div>

        <div className="pdf-page" ref={pdfPageRef}>
          {isCoverPage ? (
            <div className="page-container">
              <CoverPagePreview
                coverPageData={currentPage.coverPage as CoverPageSettingsDataT}
              />
            </div>
          ) : (
            <div className="page-container chapters" style={chapterPageStyles}>
              {chToDisplay && <ChapterPreview key={chToDisplay.id} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewDocument;
