// Common Interfaces
export interface FourSideTokensDataT {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
  
  export interface FontT {
    size: number;
    weight: number;
    lineHeight: number;
    color: string;
    textAlign: string;
    textShadow: string;
    textTransform: string;
    textDecoration: string;
    fontFamily: string;
  }
  
  export interface BorderDefaultsT {
    width: number;
    style: string;
    color: string;
    radius: number;
  }
  
  export interface ImageDefaultsT {
    width: number;
    height: string | number;
    maxWidth: number;
    maxHeight: number;
    aspectRatio: number;
  }
  
  export interface DisplayDefaultsT {
    display: string;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
  }
  
  // Theme Tokens Interfaces
  export interface ThemeTokensContextT {
    theme: ThemeTokensDataT;
    setTheme: (theme: ThemeTokensDataT) => void;
  }
  
  export interface ThemeTokensDataT {
    coverPage: CoverPageStylesT;
    page: PageTokensDataT;
    chapter: ChapterStylesT;
    section: SectionStylesT;
    contentItem: ContentItemStylesT;
  }

  
  export interface PageTokensDataT {
      height: number;
      width: number;
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    backgroundColor: string;
    border: BorderDefaultsT;
  }



  
  // Styles Interfaces
  export interface CoverPageStylesT {
    display: DisplayDefaultsT;
    documentTitle: FontT;
    contributorsRole: FontT;
    contributorsName: FontT;
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    border: BorderDefaultsT;
    backgroundColor: string;
    logo: {
      imageSize: ImageDefaultsT;
      margin: FourSideTokensDataT;
      padding: FourSideTokensDataT;
      border: BorderDefaultsT;
    };
  }
  
  export interface PageStylesT {
    size: {
      height: number;
      width: number;
    };
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    backgroundColor: string;
    border: BorderDefaultsT;
  }
  
  export interface ChapterStylesT {
    font: FontT;
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    border: BorderDefaultsT;
    backgroundColor: string;
  }
  
  export interface SectionStylesT {
    font: FontT;
    flexDir: string;
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    backgroundColor: string;
    border: BorderDefaultsT;
  }
  
  export interface ContentItemStylesT {
    font: FontT;
    margin: FourSideTokensDataT;
    padding: FourSideTokensDataT;
    backgroundColor: string;
    border: BorderDefaultsT;
    image: ImageDefaultsT
  }
  