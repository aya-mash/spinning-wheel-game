import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/providers/ThemeProvider";
import Welcome from "./pages/welcome/WelcomePage";
import Game from "./pages/game/GamePage";
import Results from "./pages/result/ResultPage";
import Header from "./components/Header";
import { SpinHistoryProvider } from "./context/providers/SpinHistoryProvider";

function App() {
  return (
    <ThemeProvider>
      <SpinHistoryProvider>
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
      </SpinHistoryProvider>
    </ThemeProvider>
  );
}

export default App;
