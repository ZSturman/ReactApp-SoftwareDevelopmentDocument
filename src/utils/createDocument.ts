export function generateRandomId() {
  return Math.random().toString(36).substring(2, 10);
}

export function createContentSettings(visible = true) {
  return {
    visible: visible,
  };
}

const defaultContentSettings = createContentSettings();

export function createContent(
  contentType = "Text",
  item = "New Content",
  items = ["New Item"],
  settings = defaultContentSettings
) {
  return {
    id: generateRandomId(),
    contentType: contentType,
    item: item,
    items: items,
    settings: settings,
  };
}

//const defaultContent = createContent();

export function createHeaderFooterSettings(
  show = false,
  text = "Header & Footer Default Text",
  textAlign = "center",
  sameAsTitle = false,
  everyPage = false
) {
  return {
    show: show,
    text: text,
    textAlign: textAlign,
    sameAsTitle: sameAsTitle,
    everyPage: everyPage,
  };
}

const defaultHeaderFooterSettings = createHeaderFooterSettings();

export function createSectionSettings(
  header = defaultHeaderFooterSettings,
  visible = true,
  flowDirectionRow = false
) {
  return {
    header: header,
    visible: visible,
    expanded: true,
    flowDirectionRow: flowDirectionRow,
  };
}

const defaultSectionSettings = createSectionSettings();

export function createSection(
  title = "New Section",
  settings = defaultSectionSettings,
  contents = []
) {
  return {
    id: generateRandomId(),
    title: title,
    settings: settings,
    contents: contents,
  };
}

//const defaultSection = createSection();

export function createChapterSettings(
  header = defaultHeaderFooterSettings,
  footer = defaultHeaderFooterSettings,
  visible = true,
  pageBreakBefore = false,
  pageBreakAfter = false
) {
  return {
    header: header,
    footer: footer,
    visible: visible,
    expanded: true,
    pageBreakBefore: pageBreakBefore,
    pageBreakAfter: pageBreakAfter,
  };
}

const defaultChapterSettings = createChapterSettings();

export function createChapter(
  title = "New Chapter",
  settings = defaultChapterSettings,
  sectionArray = []
) {
  return {
    id: generateRandomId(),
    title: title,
    settings: settings,
    sections: sectionArray,
  };
}

//const defaultChapter = createChapter();

export function addContributor(
  name = "Nelson 'Big Head' Bigetti",
  email = "alwaysblue@piedpiper.com",
  role = "CEO"
) {
  return {
    id: generateRandomId(),
    name: name,
    email: email,
    role: role,
  };
}

const defaultContributor = addContributor();

export function coverPageSettings(design = "default") {
  return {
    design: design,
  };
}

const defaultCoverPage = coverPageSettings();

export function createDocumentSettings(
  theme = "default",
  showCoverPage = false
) {
  return {
    theme: theme,
    showCoverPage: showCoverPage,
    dateCreated: Date.now(),
    dateUpdated: Date.now(),
    isDeleted: false,

    expanded: true,
  };
}

const defaultDocumentSettings = createDocumentSettings();

export function createDocument(
  title: string = "New Document",

  documentSettings = defaultDocumentSettings,
  contributors = [defaultContributor],
  chapters = [],
  coverPage = defaultCoverPage,
  logo: string = ""
) {
  return {
    id: generateRandomId(),
    title: title,
    settings: documentSettings,
    contributors: contributors,
    coverPage: coverPage,
    chapters: chapters,
    logo: logo,
  };
}

const document = createDocument();

export const data = {
  documents: [document],
};
