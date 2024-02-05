import { SectionDataT } from "./SectionDataType";


interface ChapterSettingsDataT {
  visible: boolean;
  expanded: boolean;
  dateCreated: number;
  dateUpdated: number;
}

export interface ChapterDataT {
  id: string;
  title: string;
  settings: ChapterSettingsDataT;
  sections: SectionDataT[] | [];
  height: number;
}
