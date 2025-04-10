import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import { darkTheme, lightTheme } from "../../constants/themeModes";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("wheelTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({ isDark, theme, toggleTheme }),
    [isDark, theme]
  );

  useEffect(() => {
    localStorage.setItem("wheelTheme", JSON.stringify(isDark));
  }, [isDark]);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
