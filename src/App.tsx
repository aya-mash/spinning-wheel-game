import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import Welcome from "./pages/welcome/WelcomePage";
import Game from "./pages/game/GamePage";
import Results from "./pages/result/ResultPage";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <main className="pt-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
