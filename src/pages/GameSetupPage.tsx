import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Plus, Minus, Settings, Users, ArrowLeft, Play } from 'lucide-react';
import { categories } from '../data/categories';

export const GameSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTeams, startGame } = useGameContext();
  
  const [teamNames, setTeamNames] = useState(['Grupo 1', 'Grupo 2']);
  const [timerDuration, setTimerDuration] = useState(60);
  const [selectedCategories, setSelectedCategories] = useState(['animals', 'movies', 'professions']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(['easy', 'medium', 'hard']);

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

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      if (selectedDifficulties.length > 1) {
        setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
      }
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const handleStartGame = () => {
    const teams = createTeams(teamNames);
    const filteredCategories = selectedCategories.filter(catId => {
      const category = categories.find(c => c.id === catId);
      return category && selectedDifficulties.includes(category.difficulty);
    });
    
    startGame({
      teams,
      timerDuration,
      selectedCategories: filteredCategories.length > 0 ? filteredCategories : selectedCategories
    });
    navigate('/game');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-green-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg">
            ⚙️ Configuração do Jogo
          </h1>
          
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grupos */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Grupos</h2>
            </div>
            
            <div className="space-y-3">
              {teamNames.map((name, index) => (
                <input
                  key={index}
                  type="text"
                  value={name}
                  onChange={(e) => updateTeamName(index, e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder={`Nome do grupo ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-6 gap-3">
              <button
                onClick={removeTeam}
                disabled={teamNames.length <= 2}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 font-semibold"
              >
                <Minus className="w-4 h-4" />
                <span>Remover</span>
              </button>
              
              <button
                onClick={addTeam}
                disabled={teamNames.length >= 8}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Configurações do Timer */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-6 h-6 text-white" />
              <h2 className="text-xl font-semibold text-white">Timer</h2>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-3">
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
                  className="flex-1 h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider backdrop-blur-sm"
                />
                <span className="w-16 text-center font-bold text-xl bg-white/20 text-white px-3 py-2 rounded-xl backdrop-blur-sm">
                  {timerDuration}s
                </span>
              </div>
            </div>

            {/* Seleção de Dificuldade */}
            <div className="mt-8">
              <label className="block text-white font-medium mb-3">
                Dificuldades
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={`p-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      selectedDifficulties.includes(difficulty)
                        ? `bg-gradient-to-r ${getDifficultyColor(difficulty)} text-white shadow-lg`
                        : 'bg-white/20 text-white/70 hover:bg-white/30'
                    }`}
                  >
                    {getDifficultyLabel(difficulty)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seleção de Categorias */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
          <h2 className="text-xl font-semibold text-white mb-6">Categorias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              const isDifficultySelected = selectedDifficulties.includes(category.difficulty);
              
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  disabled={!isDifficultySelected}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${
                    isSelected && isDifficultySelected
                      ? 'border-white bg-white/30 text-white shadow-lg'
                      : isDifficultySelected
                      ? 'border-white/30 hover:border-white/50 text-white hover:bg-white/20'
                      : 'border-white/20 text-white/50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className={`text-xs mt-2 px-2 py-1 rounded-full ${
                    category.difficulty === 'easy' ? 'bg-green-500/20 text-green-200' :
                    category.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-200' :
                    'bg-red-500/20 text-red-200'
                  }`}>
                    {getDifficultyLabel(category.difficulty)}
                  </div>
                  {isSelected && isDifficultySelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-white/80 text-sm mt-4">
            {selectedCategories.filter(catId => {
              const cat = categories.find(c => c.id === catId);
              return cat && selectedDifficulties.includes(cat.difficulty);
            }).length} categoria{selectedCategories.length !== 1 ? 's' : ''} selecionada{selectedCategories.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Botão Iniciar */}
        <div className="text-center">
          <button
            onClick={handleStartGame}
            disabled={selectedCategories.length === 0}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-12 py-4 rounded-2xl text-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center space-x-3 mx-auto"
          >
            <Play className="w-6 h-6" />
            <span>Iniciar Jogo</span>
          </button>
        </div>
      </div>
    </div>
  );
};