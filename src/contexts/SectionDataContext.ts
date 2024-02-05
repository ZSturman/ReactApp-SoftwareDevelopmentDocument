import { createContext, useContext } from "react";
import { SectionManagerContextT } from "../types/managerContext/SectionManagerContextT";
import { defaultSectionManagerContext } from "../defaults/managerContext"

export const SectionDataContext = createContext<SectionManagerContextT>(
    defaultSectionManagerContext
);

export const useSectionDataContext = () => useContext(SectionDataContext);
