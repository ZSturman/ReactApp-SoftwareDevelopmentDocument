import { createContext, useContext } from "react";
import { ChapterManagerContextT } from "../types/managerContext/ChapterManagerContextT";
import { defaultChapterManagerContext } from "../defaults/managerContext"

export const ChapterDataContext = createContext<ChapterManagerContextT>(
    defaultChapterManagerContext
);

export const useChapterDataContext = () => useContext(ChapterDataContext);
