import React, { useState, useEffect } from 'react';
import { Timer } from './Timer';
import { ScoreBoard } from './ScoreBoard';
import { AIStatus } from './AIStatus';
import { Confetti } from './Confetti';
import { SuccessEffect } from './SuccessEffect';
import { Check, Shuffle, ArrowRight, Home, Eye, EyeOff } from 'lucide-react';
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
  const [showSuccessEffect, setShowSuccessEffect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wordVisible, setWordVisible] = useState(true);

  // Mostrar palavra quando o timer parar ou resetar
  useEffect(() => {
    if (!gameState.isPlaying && !gameState.isPaused) {
      setWordVisible(true);
    }
  }, [gameState.isPlaying, gameState.isPaused]);

  const handleCorrectAnswer = () => {
    // Revelar a palavra ao acertar
    setWordVisible(true);
    
    setShowSuccessEffect(true);
    setShowConfetti(true);
    
    // Esconder efeitos após 2 segundos
    setTimeout(() => {
      setShowSuccessEffect(false);
      setShowConfetti(false);
    }, 2000);
    
    // Reset do timer ao acertar
    onResetTimer();
    
    onCorrectAnswer();
  };

  const handleStartTimer = () => {
    setWordVisible(false);
    onStartTimer();
  };

  const handleNextTurn = () => {
    // Ocultar palavra ao passar para próxima vez
    setWordVisible(false);
    onNextTurn();
  };

  const toggleWordVisibility = () => {
    // Permitir alternar visibilidade sempre (mesmo durante o jogo)
    setWordVisible(!wordVisible);
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Espaço para alternar visibilidade da palavra (sempre habilitado)
      if (event.code === 'Space') {
        event.preventDefault();
        toggleWordVisibility();
      }
      
      // Enter para acertar
      if (event.code === 'Enter') {
        event.preventDefault();
        handleCorrectAnswer();
      }
      
      // Seta direita para próxima vez
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleNextTurn();
      }
      
      // S para nova palavra (skip) - só se não estiver jogando
      if (event.code === 'KeyS' && !gameState.isPlaying) {
        event.preventDefault();
        onSkipWord();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [wordVisible, gameState.isPlaying]); // Adicionar gameState.isPlaying como dependência

  return (
    <>
      {/* Efeitos visuais */}
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      <SuccessEffect 
        isActive={showSuccessEffect} 
        onComplete={() => setShowSuccessEffect(false)}
        teamColor={currentTeam?.color}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
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
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200 transition-all duration-300 hover:scale-105 min-h-[120px] flex items-center justify-center relative"
                style={{ color: currentTeam?.color }}
              >
                {wordVisible ? (
                  <div className="relative">
                    {gameState.currentWord.toUpperCase()}
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2 text-gray-400">
                    <EyeOff className="w-12 h-12 sm:w-16 sm:h-16 opacity-50" />
                    <span className="text-lg sm:text-xl font-medium">PALAVRA OCULTA</span>
                  </div>
                )}
                
                {/* Indicador de status */}
                {!wordVisible && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      OCULTA
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={toggleWordVisibility}
                  className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  {wordVisible ? (
                    <>
                      <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Ocultar Palavra</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Mostrar Palavra</span>
                    </>
                  )}
                  <span className="text-xs opacity-75">(Espaço)</span>
                </button>

                <button
                  onClick={onSkipWord}
                  disabled={gameState.isPlaying}
                  className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 transform text-sm sm:text-base ${
                    gameState.isPlaying 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white hover:scale-105'
                  }`}
                >
                  <Shuffle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Nova Palavra</span>
                  <span className="text-xs opacity-75">(S)</span>
                </button>
              </div>

              {/* Dicas de atalhos */}
              <div className="mt-3 text-center">
                <div className="text-xs text-gray-500 space-x-4">
                  <span>Espaço: Ocultar/Mostrar</span>
                  <span>Enter: Acertou!</span>
                  <span>→: Próxima Vez</span>
                  <span>S: Nova Palavra</span>
                </div>
                {gameState.isPlaying && (
                  <div className="mt-2 text-xs text-orange-600 font-medium">
                    ⚠️ Timer rodando - nova palavra desabilitada
                  </div>
                )}
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              <Timer
                timeLeft={gameState.timeLeft}
                isPlaying={gameState.isPlaying}
                isPaused={gameState.isPaused}
                duration={gameState.timerDuration}
                onStart={handleStartTimer}
                onPause={onPauseTimer}
                onReset={onResetTimer}
              />
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={handleCorrectAnswer}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Acertou!</span>
                <span className="text-xs opacity-75">(Enter)</span>
              </button>
              
              <button
                onClick={handleNextTurn}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Próxima Vez</span>
                <span className="text-xs opacity-75">(→)</span>
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
    </>
  );
};