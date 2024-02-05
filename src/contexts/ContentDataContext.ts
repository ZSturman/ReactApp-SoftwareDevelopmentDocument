import { createContext, useContext } from "react";
import { ContentManagerContextT } from "../types/managerContext/ContentManagerContextT";
import { defaultContentManagerContext } from "../defaults/managerContext"

export const ContentDataContext = createContext<ContentManagerContextT>(
    defaultContentManagerContext
);

export const useContentDataContext = () => useContext(ContentDataContext);
