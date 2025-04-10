import { Banknote, History } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import HistoryModal from "./HistoryModal";
import { useTheme } from "../context/hooks/theme";

const Header = () => {
  const { theme, isDark } = useTheme();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 ${theme.card} shadow-sm z-50`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Banknote className={`w-8 h-8 ${theme.text}`} />
            <span className={`text-xl font-semibold ${theme.text}`}>
              Spin & Win
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className={`p-2 rounded-full transition-colors ${
                isDark
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-200 text-gray-900"
              }`}
              aria-label="View history"
            >
              <History size={24} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
};

export default Header;
