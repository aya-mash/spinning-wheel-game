import { History, Trash2 } from 'lucide-react';
import { useSpinHistory } from '../context/hooks/history';
import { useTheme } from '../context/hooks/theme';

const SpinHistory = () => {
  const { history, clearHistory } = useSpinHistory();
  const { theme, isDark } = useTheme();

  if (history.length === 0) {
    return (
      <div className={`text-center py-8 ${theme.text}`}>
        <History className="mx-auto mb-4 opacity-50" size={32} />
        <p>No spins recorded yet</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className={theme.text} size={20} />
          <h3 className={`${theme.text} font-semibold`}>Recent Spins</h3>
        </div>
        <button
          onClick={clearHistory}
          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
          title="Clear history"
        >
          <Trash2 className="text-red-500" size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {history.map((spin, index) => (
          <div
            key={spin.segment.label + index}
            className={`flex items-center justify-between p-2 rounded ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}
          >
            <span className={theme.text}>{spin.segment.label}</span>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: spin.segment.color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinHistory;