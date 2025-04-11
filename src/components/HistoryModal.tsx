import { X } from "lucide-react";
import SpinHistory from "./SpinHistory";
import { useTheme } from "../context/hooks/theme";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal = ({ isOpen, onClose }: HistoryModalProps) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity flex items-center justify-center z-50">
      <div
        className={`${theme.card} rounded-lg shadow-xl w-full max-w-md relative`}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${theme.text}`}
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-4 ${theme.text}`}>
            Spin History
          </h2>
          <SpinHistory />
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
