import { createContext } from "react";
import { Theme } from "../types/wheel";
import { lightTheme } from "../constants/themeModes";

interface ThemeContextType {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => {},
});
