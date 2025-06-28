import React, { createContext, useContext, ReactNode } from 'react';
import { useGame } from '../hooks/useGame';
import { GameState, Team, GameSettings } from '../types/game';

interface GameContextType {
  gameState: GameState;
  aiStatus: {
    available: boolean;
    hasApiKey: boolean;
    enabled: boolean;
  };
  activateAudio: () => void;
  createTeams: (names: string[]) => Team[];
  startGame: (settings: GameSettings) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  correctAnswer: () => void;
  skipWord: () => void;
  nextTurn: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const gameLogic = useGame();

  return (
    <GameContext.Provider value={gameLogic}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};