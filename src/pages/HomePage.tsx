import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Settings, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
              🎭 Jogo de Mímica
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              Diversão garantida para toda a família!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">Fácil de Jogar</h3>
              <p className="text-white/80 text-sm">
                Configure grupos, escolha categorias e comece a diversão!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Timer Personalizado</h3>
              <p className="text-white/80 text-sm">
                Ajuste o tempo de cada rodada conforme sua preferência
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">Múltiplas Categorias</h3>
              <p className="text-white/80 text-sm">
                Animais, filmes, profissões e muito mais com diferentes dificuldades
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold text-white mb-2">Placar em Tempo Real</h3>
              <p className="text-white/80 text-sm">
                Acompanhe a pontuação e veja quem está liderando
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/setup')}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>Iniciar Novo Jogo</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => navigate('/setup')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Settings className="w-5 h-5" />
                <span>Configurar</span>
              </button>

              <button
                onClick={() => navigate('/leaderboard')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Trophy className="w-5 h-5" />
                <span>Ranking</span>
              </button>

              <button
                onClick={() => navigate('/setup')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Grupos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};