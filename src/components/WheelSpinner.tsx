import { useCallback, useEffect, useRef, useState } from "react";
import { WheelSegment, SpinResult } from "../types/wheel";

type WheelSpinnerProps = {
  segments: WheelSegment[];
  onSpinComplete: (result: SpinResult) => void;
  predeterminedSegmentIndex?: number;
  spinDuration?: number;
};

export const WheelSpinner = ({
  segments,
  onSpinComplete,
  predeterminedSegmentIndex = 2,
  spinDuration = 5000,
}: WheelSpinnerProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const totalRotationRef = useRef(0);

  const segmentDegree = 360 / segments.length;

  const spin = useCallback(
    (isPredetermined: boolean) => {
      if (isSpinning || segments.length === 0) return;

      setIsSpinning(true);

      const targetIndex = isPredetermined
        ? Math.max(0, Math.min(predeterminedSegmentIndex, segments.length - 1))
        : Math.floor(Math.random() * segments.length);

      const baseRotation = 360 * 5;
      const targetDegree =
        360 - (targetIndex * segmentDegree + segmentDegree / 2); // Arrow points to top

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
    [isSpinning, segments, predeterminedSegmentIndex, segmentDegree, onSpinComplete, spinDuration]
  );

  useEffect(() => {
    setRotation(0);
    totalRotationRef.current = 0;
  }, [segments]);

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${spinDuration / 1000}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`,
        }}
      >
        {segments.map(({ id, color, label }, index) => {
          const rotate = index * segmentDegree;
          return (
            <div
              key={id}
              className="wheel-segment"
              style={{
                backgroundColor: color,
                transform: `rotate(${rotate}deg) skewY(-${90 - segmentDegree}deg)`,
              }}
            >
              <div
                className="segment-label"
                style={{
                  transform: `skewY(${90 - segmentDegree}deg) rotate(${segmentDegree / 2}deg)`,
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="wheel-center" />
      <div className="wheel-pointer" />

      <div className="spin-buttons">
        <button
          onClick={() => spin(false)}
          disabled={isSpinning}
          className="spin-button spin-button-random"
        >
          Random Spin
        </button>
        <button
          onClick={() => spin(true)}
          disabled={isSpinning}
          className="spin-button spin-button-predetermined"
        >
          Pre-Determined Spin
        </button>
      </div>
    </div>
  );
};
