import React, { useState } from 'react';
import { Timer } from './Timer';
import { Check, X, Shuffle, ArrowRight, Home, Plus, Minus, Settings, Users, Eye, EyeOff, Trophy, Star, Crown } from 'lucide-react';
import { GameState, GameSettings, Team } from '../types/game';
import { categories } from '../data/categories';

interface CompactGameProps {
  gameState: GameState;
  createTeams: (names: string[]) => Team[];
  onStartGame: (settings: GameSettings) => void;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResetTimer: () => void;
  onCorrectAnswer: () => void;
  onSkipWord: () => void;
  onNextTurn: () => void;
  onResetGame: () => void;
}

export const CompactGame: React.FC<CompactGameProps> = ({
  gameState,
  createTeams,
  onStartGame,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onCorrectAnswer,
  onSkipWord,
  onNextTurn,
  onResetGame
}) => {
  const [teamNames, setTeamNames] = useState(['Grupo 1', 'Grupo 2']);
  const [timerDuration, setTimerDuration] = useState(60);
  const [selectedCategories, setSelectedCategories] = useState(['animals', 'movies', 'professions']);
  const [wordVisible, setWordVisible] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentTeam = gameState.teams[gameState.currentTeam];
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...gameState.teams.map(t => t.score));

  const addTeam = () => {
    if (teamNames.length < 6) {
      setTeamNames([...teamNames, `Grupo ${teamNames.length + 1}`]);
    }
  };

  const removeTeam = () => {
    if (teamNames.length > 2) {
      setTeamNames(teamNames.slice(0, -1));
    }
  };

  const updateTeamName = (index: number, name: string) => {
    const newNames = [...teamNames];
    newNames[index] = name;
    setTeamNames(newNames);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleStartGame = () => {
    const teams = createTeams(teamNames);
    onStartGame({
      teams,
      timerDuration,
      selectedCategories
    });
    setWordVisible(true);
  };

  const handleCorrectAnswer = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
    onCorrectAnswer();
    setWordVisible(true);
  };

  const handleStartTimer = () => {
    setWordVisible(false);
    onStartTimer();
  };

  const handleNextTurn = () => {
    setWordVisible(true);
    onNextTurn();
  };

  const handleSkipWord = () => {
    setWordVisible(true);
    onSkipWord();
  };

  if (!gameState.gameStarted) {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎭 Jogo de Mímica
          </h1>
          <p className="text-gray-600">Configure e jogue tudo em uma tela!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grupos */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">Grupos</h2>
            </div>
            
            <div className="space-y-2">
              {teamNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  value={name}
                  onChange={(e) => updateTeamName(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  placeholder={`Grupo ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={removeTeam}
                disabled={teamNames.length <= 2}
                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all text-sm"
              >
                <Minus className="w-4 h-4" />
                <span>Remover</span>
              </button>
              
              <button
                onClick={addTeam}
                disabled={teamNames.length >= 6}
                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Configurações */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">Timer</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo (segundos)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="15"
                  value={timerDuration}
                  onChange={(e) => setTimerDuration(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-12 text-center font-semibold text-lg bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                  {timerDuration}s
                </span>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Categorias</h2>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {categories.slice(0, 8).map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`relative p-2 rounded-lg border-2 transition-all text-xs ${
                    selectedCategories.includes(category.id)
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg mb-1">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                  {selectedCategories.includes(category.id) && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {selectedCategories.length} selecionada{selectedCategories.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleStartGame}
            disabled={selectedCategories.length === 0}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Iniciar Jogo 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎭 Jogo de Mímica
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Rodada {gameState.round}</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            Vez do <span style={{ color: currentTeam?.color }} className="font-semibold">{currentTeam?.name}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Placar Compacto */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-800">Placar</h2>
            </div>
            
            <div className="space-y-2">
              {sortedTeams.map((team, index) => {
                const isCurrentTeam = gameState.teams.findIndex(t => t.id === team.id) === gameState.currentTeam;
                const isFirst = index === 0 && team.score > 0;
                
                return (
                  <div
                    key={team.id}
                    className={`relative p-3 rounded-lg border-2 transition-all ${
                      isCurrentTeam
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 scale-105'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        <span className={`font-semibold text-sm truncate max-w-20 ${
                          isCurrentTeam ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {team.name}
                        </span>
                        {isFirst && <Crown className="w-3 h-3 text-yellow-500 fill-current" />}
                      </div>
                      <span className={`text-xl font-bold ${
                        isCurrentTeam ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {team.score}
                      </span>
                    </div>
                    
                    {isCurrentTeam && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        Sua vez!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Área Principal do Jogo */}
        <div className="lg:col-span-3 space-y-6">
          {/* Palavra e Timer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Palavra */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 relative">
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500 bg-opacity-90 rounded-xl flex items-center justify-center z-10 animate-pulse">
                  <div className="text-white text-4xl font-bold">🎉 ACERTOU! 🎉</div>
                </div>
              )}
              
              <div className="mb-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                  <span className="text-lg">{gameState.currentCategory?.icon}</span>
                  <span className="font-medium">{gameState.currentCategory?.name}</span>
                </div>
              </div>
              
              <div className="relative">
                {wordVisible ? (
                  <div 
                    className="text-3xl font-bold text-gray-800 mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-200 transition-all duration-300"
                    style={{ color: currentTeam?.color }}
                  >
                    {gameState.currentWord.toUpperCase()}
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-gray-400 mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-200">
                    PALAVRA OCULTA
                  </div>
                )}
                
                <button
                  onClick={() => setWordVisible(!wordVisible)}
                  className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm mb-3"
                >
                  {wordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{wordVisible ? 'Ocultar' : 'Mostrar'}</span>
                </button>
                
                <button
                  onClick={handleSkipWord}
                  className="flex items-center space-x-2 mx-auto px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 text-sm"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Nova Palavra</span>
                </button>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
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
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={handleCorrectAnswer}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
            >
              <Check className="w-4 h-4" />
              <span>Acertou! (+1)</span>
            </button>
            
            <button
              onClick={handleNextTurn}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Próxima Vez</span>
            </button>
            
            <button
              onClick={onResetGame}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm md:col-span-2"
            >
              <Home className="w-4 h-4" />
              <span>Novo Jogo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};