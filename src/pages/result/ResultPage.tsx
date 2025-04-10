import { useNavigate, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";
import { SpinResult } from "../../types/wheel";
import { useTheme } from "../../context/hooks/theme";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const result = location.state?.result as SpinResult;

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center p-4`}
    >
      <div
        className={`${theme.card} rounded-lg p-8 text-center max-w-md w-full shadow-lg`}
      >
        <div className="text-yellow-500 mb-6 flex justify-center">
          <Trophy size={48} />
        </div>
        <h2 className={`text-4xl font-bold mb-4 ${theme.text}`}>
          Congratulations!
        </h2>
        <p className={`text-xl mb-8 ${theme.text}`}>
          You won{" "}
          <span className="font-bold text-blue-500">
            {result?.segment.label}
          </span>
          !
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Results;
