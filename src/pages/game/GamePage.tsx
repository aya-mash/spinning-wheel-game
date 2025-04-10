import { WheelSpinner } from "../../components/WheelSpinner";
import { WheelSegment } from "../../types/wheel";

const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 1, label: "100 Points", color: "#FF6B6B" },
  { id: 2, label: "200 Points", color: "#4ECDC4" },
  { id: 3, label: "300 Points", color: "#45B7D1" },
  { id: 4, label: "400 Points", color: "#96CEB4" },
  { id: 5, label: "500 Points", color: "#D4A5A5" },
  { id: 6, label: "600 Points", color: "#9B59B6" },
  { id: 7, label: "700 Points", color: "#3498DB" },
  { id: 8, label: "800 Points", color: "#F1C40F" },
];

const Game = () => {
  return (
    <div className="min-h-screen bg-gradient-game flex items-center justify-center min-w-screen">
      <div className="card">
        <h2 className="title">Spin the Wheel!</h2>
        <WheelSpinner segments={WHEEL_SEGMENTS} />
      </div>
    </div>
  );
};

export default Game;
