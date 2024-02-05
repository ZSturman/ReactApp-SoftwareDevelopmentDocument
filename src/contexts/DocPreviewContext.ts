import { createContext, useContext } from "react";
import { DocPreviewManagerContextT } from "../types/managerContext/DocPreviewManagerContextT";
import { defaultDocPreviewManagerContext } from "../defaults/previewContext"

export const DocPreviewContext = createContext<DocPreviewManagerContextT>(
    defaultDocPreviewManagerContext
    );

export const useDocPreviewContext = () => useContext(DocPreviewContext);
