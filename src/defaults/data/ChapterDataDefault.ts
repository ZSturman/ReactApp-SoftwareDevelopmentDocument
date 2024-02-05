import { defaultSectionData } from "./SectionDataDefault"

export const defaultChapterData = {
    id: "",
    title: "Chapter title",
    height: 50,
    settings: {
        visible: true,
        expanded: true,
        dateCreated: Date.now(),
        dateUpdated: Date.now()
    },
    sections: [defaultSectionData]
}