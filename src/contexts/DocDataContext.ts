import { createContext, useContext } from "react";
import { DocManagerContextT } from "../types/managerContext/DocManagerContextT";
import { defaultDocManagerContext } from "../defaults/managerContext"

export const DocDataContext = createContext<DocManagerContextT>(
    defaultDocManagerContext
);

export const useDocDataContext = () => useContext(DocDataContext);
