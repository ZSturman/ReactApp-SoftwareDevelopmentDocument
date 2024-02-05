import { useDocDataContext } from "../../contexts";

import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { FaBackward, FaForward } from "react-icons/fa";

interface PreviewWindowPaginationArrowsProps {}



const PreviewWindowPaginationArrows: React.FC<PreviewWindowPaginationArrowsProps> = () => {
  const { docPreviewManager, docPages, currentPage } = useDocDataContext();

  
  // Calculating the current page number and total pages
  const currentPageNumber = currentPage ? currentPage.docOrder : 0;
  const totalPages = docPages ? docPages.length : 0;

  return (
    <div>
      <div className="pagination">
        <button
          className="pagination-arrow-btn"
          onClick={docPreviewManager.goToFirstPage}
          disabled={currentPageNumber === 1}
        >
          <FaBackward />
        </button>
        <button
          className="pagination-arrow-btn"
          onClick={docPreviewManager.goToPrevPage}
          disabled={currentPageNumber === 1}
        >
          <IoCaretBack />
        </button>

        <span>{currentPageNumber} / {totalPages}</span>
        
        <button
          className="pagination-arrow-btn"
          onClick={docPreviewManager.goToNextPage}
          disabled={currentPageNumber === totalPages}
        >
          <IoCaretForward />
        </button>
        <button
          className="pagination-arrow-btn"
          onClick={docPreviewManager.goToLastPage}
          disabled={currentPageNumber === totalPages}
        >
          <FaForward />
        </button>
      </div>
    </div>
  );
};

export default PreviewWindowPaginationArrows;
