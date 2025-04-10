import { useNavigate } from "react-router-dom";
import { WheelSpinner } from "../../components/WheelSpinner";
import { SpinResult, WheelSegment } from "../../types/wheel";
import { useTheme } from "../../context/hooks/theme";
import { useSpinHistory } from "../../context/hooks/history";

const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 0, label: "R100", color: "#FF6B6B" },
  { id: 1, label: "R200", color: "#6B8E23" },
  { id: 2, label: "R300", color: "#45B7D1" },
  { id: 3, label: "R400", color: "#96CEB4" },
  { id: 4, label: "R500", color: "#D4A5A5" },
  { id: 5, label: "R600", color: "#9B59B6" },
  { id: 6, label: "R700", color: "#3498DB" },
  { id: 7, label: "R800", color: "#F1C40F" },
];

const Game = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addSpin } = useSpinHistory();

  const handleSpinComplete = (result: SpinResult) => {
    addSpin(result);
    navigate("/results", { state: { result } });
  };

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center p-4`}
    >
      <div
        className={`${theme.card} rounded-lg p-8 shadow-lg max-w-2xl w-full`}
      >
        <h2 className={`text-3xl font-bold text-center mb-8 ${theme.text}`}>
          Spin the Wheel!
        </h2>
        <WheelSpinner
          segments={WHEEL_SEGMENTS}
          onSpinComplete={handleSpinComplete}
        />
      </div>
    </div>
  );
};

export default Game;
