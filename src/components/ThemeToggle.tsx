import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/hooks/theme";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDark ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-900"
      }`}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
