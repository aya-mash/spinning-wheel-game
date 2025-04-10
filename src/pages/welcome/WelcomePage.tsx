import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div>
          <Sparkles />
        </div>
        <h1>Spin & Win!</h1>
        <p>
          Try your luck with our exciting spinning wheel game. Will fortune
          favor you today?
        </p>
        <button onClick={() => navigate("/game")}> Get Started</button>
      </div>
    </div>
  );
};

export default Welcome;
