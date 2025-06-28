import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { GamePlay } from "../components/GamePlay";
import { ArrowLeft, Trophy } from "lucide-react";

export const GamePlayPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    gameState,
    aiStatus,
    startTimer,
    pauseTimer,
    resetTimer,
    correctAnswer,
    skipWord,
    nextTurn,
    resetGame,
  } = useGameContext();

  const handleResetGame = () => {
    resetGame();
    navigate("/setup");
  };

  if (!gameState.gameStarted) {
    navigate("/setup");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Menu</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
              🎭 Jogo de Mímica
            </h1>
          </div>

          <button
            onClick={() => navigate("/leaderboard")}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            <Trophy className="w-5 h-5" />
            <span>Ranking</span>
          </button>
        </div>

        {/* Componente GamePlay */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
          <GamePlay
            gameState={gameState}
            aiStatus={aiStatus}
            onStartTimer={startTimer}
            onPauseTimer={pauseTimer}
            onResetTimer={resetTimer}
            onCorrectAnswer={correctAnswer}
            onSkipWord={skipWord}
            onNextTurn={nextTurn}
            onResetGame={handleResetGame}
          />
        </div>
      </div>
    </div>
  );
};
