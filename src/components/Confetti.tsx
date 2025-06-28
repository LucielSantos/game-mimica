import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

interface ConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
  '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3',
  '#FF9F43', '#10AC84', '#FF3838', '#3742FA'
];

export const Confetti: React.FC<ConfettiProps> = ({ isActive, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!isActive) {
      setPieces([]);
      return;
    }

    // Criar 100 pedaços de confete para ocupar toda a tela
    const newPieces: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50 - Math.random() * 200, // Distribuir melhor no topo
      rotation: Math.random() * 360,
      scale: Math.random() * 0.8 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 4 + 3,
        rotation: (Math.random() - 0.5) * 15
      }
    }));

    setPieces(newPieces);

    // Animação do confete
    const animate = () => {
      setPieces(prevPieces => {
        const updatedPieces = prevPieces.map(piece => ({
          ...piece,
          x: piece.x + piece.velocity.x,
          y: piece.y + piece.velocity.y,
          rotation: piece.rotation + piece.velocity.rotation,
          velocity: {
            ...piece.velocity,
            y: piece.velocity.y + 0.15, // gravidade aumentada
            x: piece.velocity.x * 0.98 // resistência do ar
          }
        }));

        // Remover pedaços que saíram da tela
        return updatedPieces.filter(piece => piece.y < window.innerHeight + 100);
      });
    };

    const interval = setInterval(animate, 16); // ~60fps

    // Parar animação após 4 segundos
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPieces([]);
      onComplete?.();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            backgroundColor: piece.color,
            boxShadow: `0 0 6px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti; 