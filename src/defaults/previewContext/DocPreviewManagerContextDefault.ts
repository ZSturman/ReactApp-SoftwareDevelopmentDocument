import { DocPreviewManagerContextT } from "../../types/managerContext";

import { defaultCoverPage } from "../../defaults/previewContext"
import { generateRandomID } from "../../utils";

export const defaultDocPreviewManagerContext: DocPreviewManagerContextT = {
    currentPage: { id: generateRandomID(), order: 0, page: defaultCoverPage },
    setCurrentPage: () => {},
    docPages: [],
    setDocPages: () => {},
    goToNextPage: () => {},
    goToPrevPage: () => {},
    goToLastPage: () => {},
    goToFirstPage: () => {},
  };
  