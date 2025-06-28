import React, { useState } from 'react';
import { Plus, Minus, Settings, Users } from 'lucide-react';
import { categories } from '../data/categories';
import { GameSettings } from '../types/game';

interface GameSetupProps {
  onStartGame: (settings: GameSettings) => void;
  createTeams: (names: string[]) => any[];
}

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, createTeams }) => {
  const [teamNames, setTeamNames] = useState(['Grupo 1', 'Grupo 2']);
  const [timerDuration, setTimerDuration] = useState(60);
  const [selectedCategories, setSelectedCategories] = useState(['animals', 'movies', 'professions']);

  const addTeam = () => {
    if (teamNames.length < 8) {
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
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎭 Jogo de Mímica
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">Configure seu jogo e prepare-se para se divertir!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Configuração de Grupos */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Grupos</h2>
          </div>
          
          <div className="space-y-3">
            {teamNames.map((name, index) => (
              <input
                key={index}
                type="text"
                value={name}
                onChange={(e) => updateTeamName(index, e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                placeholder={`Nome do grupo ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-4 sm:mt-6 gap-2">
            <button
              onClick={removeTeam}
              disabled={teamNames.length <= 2}
              className="flex items-center space-x-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Remover</span>
            </button>
            
            <button
              onClick={addTeam}
              disabled={teamNames.length >= 8}
              className="flex items-center space-x-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 text-sm sm:text-base"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

        {/* Configurações do Timer */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4 sm:mb-6">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Configurações</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempo por rodada (segundos)
            </label>
            <div className="flex items-center space-x-4">
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
      </div>

      {/* Seleção de Categorias */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Categorias</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                selectedCategories.includes(category.id)
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{category.icon}</div>
              <div className="font-medium text-xs sm:text-sm">{category.name}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                category.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                category.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {category.difficulty === 'easy' ? 'Fácil' :
                 category.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </div>
              {selectedCategories.includes(category.id) && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-4">
          Selecione pelo menos uma categoria para começar o jogo ({selectedCategories.length} selecionada{selectedCategories.length !== 1 ? 's' : ''})
        </p>
      </div>

      {/* Botão Iniciar */}
      <div className="text-center">
        <button
          onClick={handleStartGame}
          disabled={selectedCategories.length === 0}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Iniciar Jogo 🎮
        </button>
      </div>
    </div>
  );
};