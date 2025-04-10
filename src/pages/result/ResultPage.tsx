import { useNavigate, useLocation } from "react-router-dom";
import { Trophy } from "lucide-react";
import { SpinResult } from "../../types/wheel";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as SpinResult;

  return (
    <div className="min-h-screen bg-gradient-results flex items-center justify-center min-w-screen">
      <div className="card">
        <div className="icon icon-yellow">
          <Trophy />
        </div>
        <h2 className="title">Congratulations!</h2>
        <p className="subtitle">
          You won{" "}
          <span className="result-highlight">{result?.segment.label}</span>!
        </p>
        <button onClick={() => navigate("/")} className="button button-results">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Results;
