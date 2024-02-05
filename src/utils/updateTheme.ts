import { useEffect } from 'react';
import { useDocDataContext } from '../contexts';
import { defaultThemeTokens } from '../defaults/theme/defaultTheme';
import { WindowDimensions } from "./windowDimensions"

export const useThemeUpdater = (dimensions: WindowDimensions, onThemeUpdated: () => void) => {
    const { updateTheme } = useDocDataContext();
  
    useEffect(() => {
      if (typeof updateTheme === 'function') {
        updateTheme({
          page: {
            ...defaultThemeTokens.page,
            width: dimensions.width,
            height: dimensions.height,
          },
        });
        onThemeUpdated(); // Call the callback after updating the theme
      } else {
        console.error('updateTheme is not a function:', updateTheme);
      }
    }, [dimensions, updateTheme, onThemeUpdated]);
  };
  