import React from 'react';

interface AIStatusProps {
  available: boolean;
  hasApiKey: boolean;
  enabled: boolean;
}

export const AIStatus: React.FC<AIStatusProps> = ({ available, hasApiKey, enabled }) => {
  const getStatusColor = () => {
    if (available && enabled) return 'text-green-600';
    if (hasApiKey && !enabled) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusText = () => {
    if (available && enabled) return 'IA Ativa';
    if (hasApiKey && !enabled) return 'IA Desabilitada';
    if (hasApiKey) return 'IA Indisponível';
    return 'IA Não Configurada';
  };

  const getStatusIcon = () => {
    if (available && enabled) return '🤖';
    if (hasApiKey && !enabled) return '⏸️';
    if (hasApiKey) return '⚠️';
    return '❌';
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-lg">{getStatusIcon()}</span>
      <span className={`font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </span>
      {!hasApiKey && (
        <span className="text-xs text-gray-500">
          (usando palavras locais)
        </span>
      )}
    </div>
  );
};

export default AIStatus; 