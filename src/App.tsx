import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { HomePage } from "./pages/HomePage";
import { GameSetupPage } from "./pages/GameSetupPage";
import { GamePlayPage } from "./pages/GamePlayPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative z-10">
        <GameProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/setup" element={<GameSetupPage />} />
              <Route path="/game" element={<GamePlayPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </Router>
        </GameProvider>
      </div>
    </div>
  );
}

export default App;
