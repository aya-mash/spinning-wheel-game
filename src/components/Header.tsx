import { CircleUser } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../hooks/theme";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header
      className={`fixed top-0 left-0 right-0 ${theme.card} shadow-sm z-50`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleUser className={`w-8 h-8 ${theme.text}`} />
          <span className={`text-xl font-semibold ${theme.text}`}>
            Spin & Win
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
