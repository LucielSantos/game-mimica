import React, { useEffect, useState } from 'react';
import { Check, Star, Trophy } from 'lucide-react';

interface SuccessEffectProps {
  isActive: boolean;
  onComplete?: () => void;
  teamColor?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const SuccessEffect: React.FC<SuccessEffectProps> = ({ 
  isActive, 
  onComplete, 
  teamColor = '#10B981' 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      setShowText(false);
      return;
    }

    // Mostrar texto após 100ms
    const textTimer = setTimeout(() => setShowText(true), 100);

    // Criar partículas de explosão
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15,
      life: 1,
      maxLife: Math.random() * 0.5 + 0.5
    }));

    setParticles(newParticles);

    // Animação das partículas
    const animate = () => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.95,
          vy: particle.vy * 0.95,
          life: particle.life - 0.02
        }));

        return updatedParticles.filter(particle => particle.life > 0);
      });
    };

    const interval = setInterval(animate, 16);

    // Limpar após 2 segundos
    const cleanupTimer = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
      setShowText(false);
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(cleanupTimer);
      clearInterval(interval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <>
      {/* Overlay de fundo */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />
      
      {/* Partículas */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: teamColor,
              opacity: particle.life,
              transform: `scale(${particle.life})`,
              boxShadow: `0 0 8px ${teamColor}`,
            }}
          />
        ))}
      </div>

      {/* Texto de sucesso */}
      {showText && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center">
            {/* Ícone de sucesso */}
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center animate-success-glow"
                  style={{ backgroundColor: teamColor }}
                >
                  <Check className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Star className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-2 -left-2">
                  <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* Texto animado */}
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg animate-success-bounce">
                🎉 ACERTOU! 🎉
              </h2>
              <p className="text-xl text-white drop-shadow-lg animate-success-pulse">
                +1 Ponto!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessEffect; 