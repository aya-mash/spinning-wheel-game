import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        🎉 Welcome to the Spinner Game!
      </h1>
      <button
        onClick={() => navigate("/game")}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
