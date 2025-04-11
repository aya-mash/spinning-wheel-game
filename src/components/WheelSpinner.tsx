import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WheelSegment, SpinResult } from "../types/wheel";
import useSound from "use-sound";
import { useTheme } from "../context/hooks/theme";
import { useAudioContext } from "../context/hooks/audio";

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
  const [error, setError] = useState<string | null>(null);
  const totalRotationRef = useRef(0);
  const spinTimeoutRef = useRef<number | null>(null);
  const { isDark } = useTheme();
  const { isAudioEnabled, enableAudio } = useAudioContext();

  const [playTick] = useSound("/sounds/tick.mp3", {
    volume: 0.5,
    interrupt: true,
  });
  const [playWin] = useSound("/sounds/win.mp3", {
    volume: 0.7,
    interrupt: true,
  });

  const segmentsCount = segments.length;
  const segmentDegree = 360 / segmentsCount;

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  const validateSegmentSelection = useCallback(
    (segment: number): boolean => {
      return segment >= 1 && segment <= segments.length;
    },
    [segments.length]
  );

  const handleSegmentChange = (value: string) => {
    const segment = parseInt(value, 10);
    if (validateSegmentSelection(segment)) {
      setSelectedSegment(segment);
      setError(null);
    } else {
      setError(`Please select a segment between 1 and ${segments.length}`);
    }
  };

  const spin = useCallback(
    async (isPredetermined: boolean) => {
      if (isSpinning || segments.length === 0) return;

      try {
        if (!isAudioEnabled) {
          await enableAudio();
        }

        setIsSpinning(true);
        setError(null);
        playTick();

        const targetIndex = isPredetermined
          ? selectedSegment
          : Math.floor(Math.random() * segments.length);

        if (!validateSegmentSelection(targetIndex)) {
          throw new Error("Invalid segment selected");
        }

        const baseRotation = 360 * 5;
        const targetDegree =
          360 - (targetIndex * segmentDegree + segmentDegree / 2);
        const finalRotation = baseRotation + targetDegree;

        totalRotationRef.current += finalRotation;
        setRotation(totalRotationRef.current);

        spinTimeoutRef.current = window.setTimeout(() => {
          setIsSpinning(false);
          playWin();
          onSpinComplete({
            segment: segments[targetIndex - 1],
            degrees: totalRotationRef.current % 360,
          });
        }, spinDuration);
      } catch (err) {
        setIsSpinning(false);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while spinning"
        );
        console.error("Spin error:", err);
      }
    },
    [
      isSpinning,
      segments,
      isAudioEnabled,
      playTick,
      selectedSegment,
      validateSegmentSelection,
      segmentDegree,
      spinDuration,
      enableAudio,
      playWin,
      onSpinComplete,
    ]
  );

  useEffect(() => {
    setRotation(0);
    totalRotationRef.current = 0;
  }, [segments]);

  return (
    <div className="flex flex-col items-center gap-8">
      {error && (
        <div
          className="w-full max-w-xs bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-80 h-80 md:w-96 md:h-96"
      >
        <motion.div
          className="absolute w-full h-full rounded-full overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ duration: spinDuration / 1000, ease: "easeOut" }}
        >
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-md z-10"
        />
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-[24px] border-b-red-600 z-20"
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="segment-select"
            className={`block text-sm font-medium ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Select segment (1-{segments.length}):
          </label>
          <motion.input
            id="segment-select"
            type="range"
            min="1"
            max={segments.length}
            value={selectedSegment}
            onChange={(e) => handleSegmentChange(e.target.value)}
            className="w-full"
            whileFocus={{ scale: 1.02 }}
            aria-label={`Select segment between 1 and ${segments.length}`}
          />
          <div
            className={`text-center ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Selected: {selectedSegment}
          </div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            <motion.button
              onClick={() => spin(false)}
              disabled={isSpinning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={
                isSpinning ? "Wheel is spinning" : "Spin wheel randomly"
              }
            >
              {isSpinning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Spinning...</span>
                </div>
              ) : (
                "Random Spin"
              )}
            </motion.button>
            <motion.button
              onClick={() => spin(true)}
              disabled={isSpinning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDark
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={
                isSpinning
                  ? "Wheel is spinning"
                  : "Spin wheel to selected segment"
              }
            >
              {isSpinning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Spinning...</span>
                </div>
              ) : (
                "Pre-Determined Spin"
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
