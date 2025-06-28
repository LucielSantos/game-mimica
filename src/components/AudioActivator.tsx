import React, { useEffect, useRef } from 'react';

interface AudioActivatorProps {
  onActivate: () => void;
  children: React.ReactNode;
}

export const AudioActivator: React.FC<AudioActivatorProps> = ({ onActivate, children }) => {
  const hasActivated = useRef(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasActivated.current) {
        hasActivated.current = true;
        onActivate();
        
        // Remove os event listeners após a primeira interação
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Adiciona event listeners para detectar interação do usuário
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [onActivate]);

  return <>{children}</>;
};

export default AudioActivator; 