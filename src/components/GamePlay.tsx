import React from 'react';
import { Timer } from './Timer';
import { ScoreBoard } from './ScoreBoard';
import { AIStatus } from './AIStatus';
import { Check, X, Shuffle, ArrowRight, Home } from 'lucide-react';
import { GameState } from '../types/game';

interface GamePlayProps {
  gameState: GameState;
  aiStatus: {
    available: boolean;
    hasApiKey: boolean;
    enabled: boolean;
  };
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResetTimer: () => void;
  onCorrectAnswer: () => void;
  onSkipWord: () => void;
  onNextTurn: () => void;
  onResetGame: () => void;
}

export const GamePlay: React.FC<GamePlayProps> = ({
  gameState,
  aiStatus,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onCorrectAnswer,
  onSkipWord,
  onNextTurn,
  onResetGame
}) => {
  const currentTeam = gameState.teams[gameState.currentTeam];
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎭 Jogo de Mímica
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Rodada {gameState.round}</span>
          <span className="hidden sm:inline">•</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            Vez do <span style={{ color: currentTeam?.color }} className="font-semibold">{currentTeam?.name}</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <AIStatus {...aiStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
        {/* Placar */}
        <div className="xl:col-span-1 order-2 xl:order-1">
          <ScoreBoard teams={gameState.teams} currentTeam={gameState.currentTeam} />
        </div>

        {/* Área Principal do Jogo */}
        <div className="xl:col-span-3 order-1 xl:order-2 space-y-4 sm:space-y-6">
          {/* Palavra Atual */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 text-center border border-gray-100">
            <div className="mb-4">
              <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600">
                <span className="text-base sm:text-lg">{gameState.currentCategory?.icon}</span>
                <span className="font-medium">{gameState.currentCategory?.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  gameState.currentCategory?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  gameState.currentCategory?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {gameState.currentCategory?.difficulty === 'easy' ? 'Fácil' :
                   gameState.currentCategory?.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                </span>
              </div>
            </div>
            
            <div 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200 transition-all duration-300 hover:scale-105"
              style={{ color: currentTeam?.color }}
            >
              {gameState.currentWord.toUpperCase()}
            </div>
            
            <button
              onClick={onSkipWord}
              className="flex items-center space-x-2 mx-auto px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <Shuffle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Nova Palavra</span>
            </button>
          </div>

          {/* Timer */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
            <Timer
              timeLeft={gameState.timeLeft}
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
              duration={gameState.timerDuration}
              onStart={onStartTimer}
              onPause={onPauseTimer}
              onReset={onResetTimer}
            />
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={onCorrectAnswer}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Acertou!</span>
            </button>
            
            <button
              onClick={onNextTurn}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Próxima Vez</span>
            </button>
            
            <button
              onClick={onResetGame}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base sm:col-span-2 lg:col-span-1"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Novo Jogo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};