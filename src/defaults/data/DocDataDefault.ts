import { generateRandomID } from "../../utils"

export const defaultDocData = {
    id: generateRandomID(),
    title: "Default Document title",
    logo: null,
    chapters: [],
    contributors: [],
    coverPageSettings: {
        enabled: true,
        visible: true,
        coverPageTheme: "Default",
        showContributors: true,
        showLogo: true,
        layout: ["title",  "logo", "contributors"],
        horizontalAlignment: "center",
        verticalAlignment: "center"
    },
    settings: {
        theme: "PDF",
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        isDeleted: false
    }
}