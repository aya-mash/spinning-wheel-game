import { useNavigate } from "react-router-dom";
import { WheelSpinner } from "../../components/WheelSpinner";
import { SpinResult, WheelSegment } from "../../types/wheel";

const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 0, label: "100 Points", color: "#FF6B6B" },
  { id: 1, label: "200 Points", color: "#4ECDC4" },
  { id: 2, label: "300 Points", color: "#45B7D1" },
  { id: 3, label: "400 Points", color: "#96CEB4" },
  { id: 4, label: "500 Points", color: "#D4A5A5" },
  { id: 5, label: "600 Points", color: "#9B59B6" },
  { id: 6, label: "700 Points", color: "#3498DB" },
  { id: 7, label: "800 Points", color: "#F1C40F" },
];

const Game = () => {
  const navigate = useNavigate();

  const handleSpinComplete = (result: SpinResult) => {
    setTimeout(() => {
      navigate("/results", { state: { result } });
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center min-w-screen">
      <div className="card">
        <h2 className="title">Spin the Wheel!</h2>
        <WheelSpinner
          segments={WHEEL_SEGMENTS}
          onSpinComplete={handleSpinComplete}
        />
      </div>
    </div>
  );
};

export default Game;
