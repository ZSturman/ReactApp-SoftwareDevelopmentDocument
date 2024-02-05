import { CSSProperties } from "react";
import { useDocDataContext } from "../../contexts";
import { CoverPageSettingsDataT } from "../../types/data";
import { useThemeContext } from "../../contexts";
import { CoverPageStylesT } from "../../types/theme/ThemeTokens";
import "./CoverPagePreview.scss";

interface CoverPagePreviewProps {
  coverPageData: CoverPageSettingsDataT;
}

const CoverPagePreview: React.FC<CoverPagePreviewProps> = () => {
  const { doc } = useDocDataContext();
  const { theme } = useThemeContext();

  if (!doc) {
    return <div>No document selected</div>;
  }

  // Destructure the theme for cleaner access
  const { coverPage } = theme;

  // Style merging helper function
  const mergeStyles = (
    defaultStyles: CoverPageStylesT,
    customStyles?: Partial<CoverPageStylesT>
  ): CSSProperties => {
    // Merge the default and custom styles
    const mergedStyles = { ...defaultStyles, ...customStyles };

    // Convert the FourSideTokensDataT for margin and padding into a CSS string
    const marginString = `${mergedStyles.margin.top}px ${mergedStyles.margin.right}px ${mergedStyles.margin.bottom}px ${mergedStyles.margin.left}px`;
    const paddingString = `${mergedStyles.padding.top}px ${mergedStyles.padding.right}px ${mergedStyles.padding.bottom}px ${mergedStyles.padding.left}px`;

    // Convert the BorderDefaultsT properties into CSS strings
    const borderString = `${mergedStyles.border.width}px ${mergedStyles.border.style} ${mergedStyles.border.color}`;
    const borderRadiusString = `${mergedStyles.border.radius}px`;

    // Return the merged styles with converted margin, padding, and display properties
    const style: CSSProperties = {
      display: mergedStyles.display.display as CSSProperties["display"], // Cast to specific CSSProperties type
      flexDirection: mergedStyles.display
        .flexDirection as CSSProperties["flexDirection"], // Cast to specific CSSProperties type
      alignItems: mergedStyles.display
        .alignItems as CSSProperties["alignItems"], // Cast to specific CSSProperties type
      justifyContent: mergedStyles.display
        .justifyContent as CSSProperties["justifyContent"], // Cast to specific CSSProperties type
      margin: marginString,
      padding: paddingString,
      backgroundColor: mergedStyles.backgroundColor,
      border: borderString,
      borderRadius: borderRadiusString,
    };

    return style;
  };

  // Convert theme styles to React inline styles
  const coverPageStyle = mergeStyles(coverPage);

  // Document Title Style
  const titleStyle: CSSProperties = {
    fontSize: coverPage.documentTitle.size,
    fontWeight: coverPage.documentTitle.weight,
    lineHeight: coverPage.documentTitle.lineHeight,
    color: coverPage.documentTitle.color,
    textAlign: coverPage.documentTitle.textAlign as CSSProperties["textAlign"],
    textShadow: coverPage.documentTitle.textShadow,
    textTransform: coverPage.documentTitle
      .textTransform as CSSProperties["textTransform"],
    textDecoration: coverPage.documentTitle
      .textDecoration as CSSProperties["textDecoration"],
    fontFamily: coverPage.documentTitle.fontFamily,
    display: coverPage.display.display,
    justifyContent: coverPage.display.justifyContent,
    alignItems: coverPage.display.alignItems,
  };

  const contributorsName: CSSProperties = {
    fontSize: coverPage.contributorsName.size,
    fontWeight: coverPage.contributorsName.weight,
    lineHeight: coverPage.contributorsName.lineHeight,
    color: coverPage.contributorsName.color,
    textAlign: coverPage.contributorsName
      .textAlign as CSSProperties["textAlign"],
    textShadow: coverPage.contributorsName.textShadow,
    textTransform: coverPage.contributorsName
      .textTransform as CSSProperties["textTransform"],
    textDecoration: coverPage.contributorsName
      .textDecoration as CSSProperties["textDecoration"],
    fontFamily: coverPage.contributorsName.fontFamily,
  };

  const contributorsRole: CSSProperties = {
    fontSize: coverPage.contributorsRole.size,
    fontWeight: coverPage.contributorsRole.weight,
    lineHeight: coverPage.contributorsRole.lineHeight,
    color: coverPage.contributorsRole.color,
    textAlign: coverPage.contributorsRole
      .textAlign as CSSProperties["textAlign"],
    textShadow: coverPage.contributorsRole.textShadow,
    textTransform: coverPage.contributorsRole
      .textTransform as CSSProperties["textTransform"],
    textDecoration: coverPage.contributorsRole
      .textDecoration as CSSProperties["textDecoration"],
    fontFamily: coverPage.contributorsRole.fontFamily,
  };

  const logoStyle: CSSProperties = {
    maxWidth: coverPage.logo.imageSize.maxWidth,
    maxHeight: coverPage.logo.imageSize.maxHeight,
    width: coverPage.logo.imageSize.width,
    height: coverPage.logo.imageSize.height,
    margin: `${coverPage.logo.margin.top}px ${coverPage.logo.margin.right}px ${coverPage.logo.margin.bottom}px ${coverPage.logo.margin.left}px`,
    padding: `${coverPage.logo.padding.top}px ${coverPage.logo.padding.right}px ${coverPage.logo.padding.bottom}px ${coverPage.logo.padding.left}px`,
    border: `${coverPage.logo.border.width}px ${coverPage.logo.border.style} ${coverPage.logo.border.color}`,
    borderRadius: `${coverPage.logo.border.radius}px`,
  };

  return (
    <div className="cover-page-preview-container" style={coverPageStyle}>
      <h1 style={titleStyle}>{doc.title}</h1>

      {doc.coverPageSettings.showLogo && doc.logo && (
        
          <img style={logoStyle} src={doc.logo} alt="logo" />
    
      )}

      {doc.coverPageSettings.showContributors && (
        <div className="contributors-container">
          {doc.contributors.map((contributor) => (
            <div key={contributor.id} className="contributors-preview">
              <div style={contributorsRole}>{contributor.role}</div>
              <div style={contributorsName}>{contributor.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoverPagePreview;
