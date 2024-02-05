import { createContext, useContext } from "react";
import { ThemeTokensContextT } from "../types/theme/ThemeTokens";
import { defaultThemeTokensContext } from "../defaults/theme/defaultTheme";

export const ThemeContext = createContext<ThemeTokensContextT>(
    defaultThemeTokensContext
);

export const useThemeContext = () => useContext(ThemeContext);
