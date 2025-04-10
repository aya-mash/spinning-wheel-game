import { useCallback, useEffect, useRef, useState } from "react";
import { WheelSegment, SpinResult } from "../types/wheel";
import { useTheme } from "../hooks/theme";

interface WheelSpinnerProps {
  segments: WheelSegment[];
  onSpinComplete: (result: SpinResult) => void;
  spinDuration?: number;
}

export const WheelSpinner = ({
  segments,
  onSpinComplete,
  spinDuration = 5000,
}: WheelSpinnerProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState(1);
  const totalRotationRef = useRef(0);
  const { isDark } = useTheme();

  const segmentsCount = segments.length;
  const segmentDegree = 360 / segmentsCount;

  const spin = useCallback(
    (isPredetermined: boolean) => {
      if (isSpinning || segments.length === 0) return;

      setIsSpinning(true);

      const targetIndex = isPredetermined
        ? selectedSegment
        : Math.floor(Math.random() * segments.length);

      const baseRotation = 360 * 5; // 5 full rotations
      const targetDegree =
        360 - (targetIndex * segmentDegree + segmentDegree / 2);
      const finalRotation = baseRotation + targetDegree;

      totalRotationRef.current += finalRotation;
      setRotation(totalRotationRef.current);

      setTimeout(() => {
        setIsSpinning(false);
        onSpinComplete({
          segment: segments[targetIndex - 1],
          degrees: totalRotationRef.current % 360,
        });
      }, spinDuration);
    },
    [
      isSpinning,
      segments,
      selectedSegment,
      segmentDegree,
      onSpinComplete,
      spinDuration,
    ]
  );

  useEffect(() => {
    setRotation(0);
    totalRotationRef.current = 0;
  }, [segments]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div
          className="absolute w-full h-full rounded-full overflow-hidden transition-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${
              spinDuration / 1000
            }s cubic-bezier(0.17, 0.67, 0.12, 0.99)`,
          }}
        >
          {segments.map((segment, index) => (
            <div
              key={segment.id}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${index * segmentDegree}deg)`,
                transformOrigin: "50% 50%",
                clipPath: `polygon(50% 50%, 100% 0, 100% 50%)`,

                backgroundColor: segment.color,
              }}
            >
              <span
                className="absolute text-white font-bold text-sm md:text-base whitespace-nowrap"
                style={{
                  left: "70%",
                  top: "41%",
                  transform: `translate(-50%, -50%) rotate(${
                    90 - segmentDegree / 2
                  }deg)`,
                  transformOrigin: "center",
                }}
              >
                {segment.label}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-10" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-[24px] border-b-red-600 z-20" />
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="space-y-2">
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Select segment (1-{segments.length}):
          </label>
          <input
            type="range"
            min="1"
            max={segments.length}
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(parseInt(e.target.value))}
            className="w-full"
          />
          <div
            className={`text-center ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Selected: {selectedSegment}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => spin(false)}
            disabled={isSpinning}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Random Spin
          </button>
          <button
            onClick={() => spin(true)}
            disabled={isSpinning}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isDark
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Pre-Determined Spin
          </button>
        </div>
      </div>
    </div>
  );
};
