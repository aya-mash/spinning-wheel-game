import { WheelSegment } from "../types/wheel";

type WheelSpinnerProps = {
  segments: WheelSegment[];
};

export const WheelSpinner = ({ segments }: WheelSpinnerProps) => {
  const segmentDegree = 360 / segments.length;

  return (
    <div className="wheel-container">
      <div className="wheel">
        {segments.map((segment, i) => (
          <div
            key={segment.id}
            style={{ transform: `rotate(${i * segmentDegree}deg)` }}
          >
            <div style={{ background: segment.color }}>
              <span
                style={{
                  transform: `rotate(${-90 + segmentDegree / 2}deg)`,
                }}
              >
                {segment.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div />

      <div>
        <div />
      </div>

      <div>
        <button>Random Spin</button>
        <button>Pre-Determined Spin</button>
      </div>
    </div>
  );
};
