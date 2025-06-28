import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Trophy, Crown, Star, Medal, ArrowLeft, Play } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGameContext();

  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...gameState.teams.map(t => t.score));

  const getRankIcon = (index: number, score: number) => {
    if (score === 0) return null;
    
    switch (index) {
      case 0: return <Crown className="w-8 h-8 text-yellow-400 fill-current" />;
      case 1: return <Medal className="w-8 h-8 text-gray-400 fill-current" />;
      case 2: return <Medal className="w-8 h-8 text-amber-600 fill-current" />;
      default: return <Star className="w-6 h-6 text-blue-400 fill-current" />;
    }
  };

  const getRankColor = (index: number, score: number) => {
    if (score === 0) return 'from-gray-400 to-gray-500';
    
    switch (index) {
      case 0: return 'from-yellow-400 to-yellow-500';
      case 1: return 'from-gray-400 to-gray-500';
      case 2: return 'from-amber-600 to-amber-700';
      default: return 'from-blue-400 to-blue-500';
    }
  };

  const getRankLabel = (index: number, score: number) => {
    if (score === 0) return 'Sem pontos';
    
    switch (index) {
      case 0: return '🥇 Campeão';
      case 1: return '🥈 Vice-campeão';
      case 2: return '🥉 Terceiro lugar';
      default: return `${index + 1}º lugar`;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Menu</span>
          </button>
          
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
            🏆 Ranking
          </h1>
          
          {gameState.gameStarted && (
            <button
              onClick={() => navigate('/game')}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <Play className="w-5 h-5" />
              <span>Voltar ao Jogo</span>
            </button>
          )}
        </div>

        {/* Estatísticas Gerais */}
        {gameState.teams.length > 0 && (
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{gameState.round}</div>
                <div className="text-white/80">Rodadas</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{gameState.teams.reduce((sum, team) => sum + team.score, 0)}</div>
                <div className="text-white/80">Pontos Totais</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{gameState.teams.length}</div>
                <div className="text-white/80">Grupos</div>
              </div>
            </div>
          </div>
        )}

        {/* Ranking */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/30">
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Classificação</h2>
          </div>

          {gameState.teams.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">Nenhum jogo iniciado</h3>
              <p className="text-white/80 mb-6">Configure um novo jogo para ver o ranking!</p>
              <button
                onClick={() => navigate('/setup')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105"
              >
                Configurar Jogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTeams.map((team, index) => {
                const isCurrentTeam = gameState.gameStarted && gameState.teams.findIndex(t => t.id === team.id) === gameState.currentTeam;
                
                return (
                  <div
                    key={team.id}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      isCurrentTeam
                        ? 'border-white bg-white/30 scale-105 shadow-xl'
                        : 'border-white/30 bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(index, team.score)} flex items-center justify-center font-bold text-white text-lg`}>
                          {index + 1}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {getRankIcon(index, team.score)}
                          <div>
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-4 h-4 rounded-full shadow-sm"
                                style={{ backgroundColor: team.color }}
                              />
                              <span className="font-bold text-xl text-white">
                                {team.name}
                              </span>
                            </div>
                            <div className={`text-sm font-semibold ${
                              index === 0 && team.score > 0 ? 'text-yellow-300' : 'text-white/80'
                            }`}>
                              {getRankLabel(index, team.score)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-4xl font-bold text-white">
                          {team.score}
                        </div>
                        <div className="text-white/80 text-sm">
                          {team.score === 1 ? 'ponto' : 'pontos'}
                        </div>
                      </div>
                    </div>
                    
                    {isCurrentTeam && gameState.gameStarted && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-3 py-1 rounded-full animate-pulse font-semibold">
                        Jogando agora
                      </div>
                    )}
                    
                    {index === 0 && team.score > 0 && (
                      <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Líder
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ações */}
        {gameState.teams.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {gameState.gameStarted ? (
              <button
                onClick={() => navigate('/game')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Continuar Jogo</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/setup')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105"
              >
                Novo Jogo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};