import { ReactNode, useCallback, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { darkTheme, lightTheme } from "../constants/themeModes";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  const contextValue = useMemo(
    () => ({ isDark, theme, toggleTheme }),
    [isDark, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
