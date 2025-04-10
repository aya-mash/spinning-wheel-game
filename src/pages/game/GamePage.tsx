import { useNavigate } from "react-router-dom";
import { WheelSpinner } from "../../components/WheelSpinner";
import { SpinResult, WheelSegment } from "../../types/wheel";
import { useTheme } from "../../hooks/theme";

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

  const handleSpinComplete = (result: SpinResult) => {
    setTimeout(() => {
      navigate("/results", { state: { result } });
    }, 1000);
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
