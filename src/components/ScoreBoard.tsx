import React from 'react';
import { Trophy, Star, Crown } from 'lucide-react';
import { Team } from '../types/game';

interface ScoreBoardProps {
  teams: Team[];
  currentTeam: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ teams, currentTeam }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const maxScore = Math.max(...teams.map(t => t.score));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Placar</h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {sortedTeams.map((team, index) => {
          const isCurrentTeam = teams.findIndex(t => t.id === team.id) === currentTeam;
          const isLeading = team.score === maxScore && maxScore > 0;
          const isFirst = index === 0 && team.score > 0;
          
          return (
            <div
              key={team.id}
              className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 ${
                isCurrentTeam
                  ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg scale-105'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: team.color }}
                  />
                  <span className={`font-semibold text-sm sm:text-base truncate max-w-24 sm:max-w-32 ${
                    isCurrentTeam ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {team.name}
                  </span>
                  {isFirst && (
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  )}
                  {isLeading && !isFirst && (
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xl sm:text-2xl font-bold ${
                    isCurrentTeam ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {team.score}
                  </span>
                  {isFirst && (
                    <div className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full font-semibold">
                      1º
                    </div>
                  )}
                </div>
              </div>
              
              {isCurrentTeam && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  Sua vez!
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {teams.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs sm:text-sm text-gray-600 text-center bg-gray-50 px-3 py-2 rounded-lg">
            <span className="font-medium">Total de pontos:</span> {teams.reduce((sum, team) => sum + team.score, 0)}
          </div>
        </div>
      )}
    </div>
  );
};