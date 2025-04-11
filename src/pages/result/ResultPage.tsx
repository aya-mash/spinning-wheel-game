import { useNavigate, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { SpinResult } from "../../types/wheel";
import { useEffect } from "react";
import { useTheme } from "../../context/hooks/theme";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const result = location.state?.result as SpinResult;

  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen ${theme.background} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${theme.card} rounded-lg p-8 text-center max-w-md w-full shadow-lg`}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-yellow-500 mb-6"
        >
          <Trophy size={48} />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-bold mb-4 ${theme.text}`}
        >
          Congratulations!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-xl mb-8 ${theme.text}`}
        >
          You won{" "}
          <span className="font-bold text-blue-500">
            {result?.segment.label}
          </span>
          !
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Results;
