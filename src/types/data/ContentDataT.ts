export interface ContentDataT {
  id: string;
  item: string;
  settings: ContentSettingsDataT;
  height: number;
}

interface ContentSettingsDataT {
  visible: boolean;
  dateCreated: number;
  dateUpdated: number;
}
