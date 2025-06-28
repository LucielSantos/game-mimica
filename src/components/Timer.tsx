import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  duration: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  isPlaying,
  isPaused,
  duration,
  onStart,
  onPause,
  onReset
}) => {
  const progress = ((duration - timeLeft) / duration) * 100;
  const isLowTime = timeLeft <= 10;
  const isCriticalTime = timeLeft <= 5;
  
  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6">
      <div className={`relative transition-all duration-300 ${
        isCriticalTime ? 'animate-pulse scale-110' : isLowTime ? 'scale-105' : ''
      }`}>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={isCriticalTime ? "#dc2626" : isLowTime ? "#f59e0b" : "#3b82f6"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
            />
            {/* Glow effect for critical time */}
            {isCriticalTime && (
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#dc2626"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                className="opacity-30 animate-pulse"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold transition-all duration-300 ${
                isCriticalTime ? 'text-red-600 animate-bounce' : 
                isLowTime ? 'text-orange-500' : 'text-gray-700'
              }`}
            >
              {timeLeft}
            </span>
          </div>
        </div>
        
        {/* Visual effects */}
        {isLowTime && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-ping" />
        )}
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {!isPlaying ? (
          <button
            onClick={onStart}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">{isPaused ? 'Continuar' : 'Iniciar'}</span>
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Pausar</span>
          </button>
        )}
        
        <button
          onClick={onReset}
          className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Reset</span>
        </button>
      </div>
    </div>
  );
};