import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useTheme } from "../../hooks/theme";

const Welcome = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center p-4 min-w-full`}
    >
      <div
        className={`${theme.card} shadow-lg rounded-lg p-8 justify text-center max-w-md w-full`}
      >
        <div className="text-purple-500 mb-6 flex justify-center">
          <Sparkles size={48} />
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${theme.text}`}>Spin & Win!</h1>
        <p className={`text-lg mb-8 ${theme.text} opacity-90`}>
          Try your luck with our exciting spinning wheel game. Will fortune
          favor you today?
        </p>
        <button
          onClick={() => navigate("/game")}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
