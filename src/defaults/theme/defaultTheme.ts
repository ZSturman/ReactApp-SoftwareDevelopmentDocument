import {
  ThemeTokensDataT,
  ThemeTokensContextT,
  FourSideTokensDataT,
  BorderDefaultsT,
  FontT,
  ImageDefaultsT,
  DisplayDefaultsT,
} from "../../types/theme/ThemeTokens";

const marginDefaults: FourSideTokensDataT = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const paddingDefaults: FourSideTokensDataT = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const borderDefaults: BorderDefaultsT = {
  width: 0,
  style: "none",
  color: "none",
  radius: 0,
};

const textDefaults: FontT = {
  size: 20,
  weight: 400,
  lineHeight: 1,
  color: "#000",
  textAlign: "left",
  textShadow: "none",
  textTransform: "none",
  textDecoration: "none",
  fontFamily: "Arial",
};

const imageDefaults: ImageDefaultsT = {
  width: 200,
  height: 200,
  maxWidth: 300,
  maxHeight: 300,
  aspectRatio: 1,
};

const displayDefaults: DisplayDefaultsT = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  justifyContent: "center",
};

const pageDefaults = {
  height: 0,
  width: 0,
  backgroundColor: "#fff",
};


export const defaultThemeTokens: ThemeTokensDataT = {
  coverPage: {
    margin: {
      ...marginDefaults,
    },
    padding: {
      ...paddingDefaults,
      left: 50,
      right: 50,
    },
    border: { ...borderDefaults, width: 1, style: "solid", color: "#000" },
    logo: {
      margin: marginDefaults,
      padding: paddingDefaults,
      border: { ...borderDefaults, radius: 50 },

      imageSize: {
        ...imageDefaults,
        width: 200,
        height: 200,
      },
    },
    display: {
      ...displayDefaults,
      alignItems: "center",
    },
    documentTitle: {
      ...textDefaults,
      size: 50,
      weight: 400,
      textAlign: "center",
    },
    contributorsRole: {
      ...textDefaults,
    },
    contributorsName: {
      ...textDefaults,
      size: 20,
      weight: 700,
    },
    backgroundColor: "#fff",
  },
  page: {
    ...pageDefaults,
    margin: {...marginDefaults, top: 20, bottom: 20, left: 20, right: 20},
    padding: {...paddingDefaults, top: 20, bottom: 20, left: 20, right: 20},
    border: borderDefaults,
  },
  chapter: {
    font: {
      ...textDefaults,
      size: 50,
      textDecoration: "underline" 
    },
    margin: { ...marginDefaults, top: 20, bottom: 20, left: 20, right: 20 },
    padding: { ...paddingDefaults, left: 20, right: 20, top: 20, bottom: 0 },
    border: borderDefaults,
    backgroundColor: "#fff",
  },
  section: {
    font: { ...textDefaults, size: 20, weight: 700 },
    flexDir: "row",
    margin: { ...marginDefaults, top: 0, bottom: 0, left: 20, right: 20 },
    padding: { ...paddingDefaults, left: 20, right: 20, top: 0, bottom: 0 },
    backgroundColor: "#fff",
    border: borderDefaults,
  },
  contentItem: {
    font: textDefaults,
    margin: { ...marginDefaults, top: 0, bottom: 0, left: 20, right: 20 },
    padding: { ...paddingDefaults, left: 20, right: 20, top: 0, bottom: 0 },
    backgroundColor: "#fff",
    border: borderDefaults,
    image:  {
      ...imageDefaults,
      width: 200,
      height: 200,
    
    }
  },
};

export const defaultThemeTokensContext: ThemeTokensContextT = {
  theme: defaultThemeTokens,
  setTheme: () => {},
};
