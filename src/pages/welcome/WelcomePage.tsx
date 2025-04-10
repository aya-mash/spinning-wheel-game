import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-welcome flex items-center justify-center min-w-screen">
      <div className="card bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="icon icon-purple">
          <Sparkles />
        </div>
        <h1 className="title">Spin & Win!</h1>
        <p className="subtitle">
          Try your luck with our exciting spinning wheel game. Will fortune
          favor you today?
        </p>
        <button
          onClick={() => navigate("/game")}
          className="button button-welcome"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
