import {ContentDataT} from "./ContentDataT"

interface SectionSettingsDataT {
    visible: boolean;
    expanded: boolean;
    flowDirectionRow: boolean;
    dateCreated: number;
    dateUpdated: number;
  }
  
  export interface SectionDataT {
    id: string;
    title: string;
    settings: SectionSettingsDataT;
    contents: ContentDataT[] | [];
    height: number;
  }