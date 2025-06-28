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

    // Criar mais partículas de explosão para ocupar toda a tela
    const newParticles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20,
      life: 1,
      maxLife: Math.random() * 0.8 + 0.4
    }));

    setParticles(newParticles);

    // Animação das partículas
    const animate = () => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.92,
          vy: particle.vy * 0.92,
          life: particle.life - 0.015
        }));

        return updatedParticles.filter(particle => particle.life > 0);
      });
    };

    const interval = setInterval(animate, 16);

    // Limpar após 3 segundos
    const cleanupTimer = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
      setShowText(false);
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(cleanupTimer);
      clearInterval(interval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <>
      {/* Overlay de fundo com gradiente */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 z-[9998]" />
      
      {/* Partículas */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: teamColor,
              opacity: particle.life,
              transform: `scale(${particle.life * 2})`,
              boxShadow: `0 0 12px ${teamColor}`,
            }}
          />
        ))}
      </div>

      {/* Texto de sucesso */}
      {showText && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
          <div className="text-center animate-success-scale">
            {/* Ícone de sucesso */}
            <div className="mb-8 flex justify-center">
              <div className="relative animate-success-shake">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center animate-success-glow"
                  style={{ backgroundColor: teamColor }}
                >
                  <Check className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-4 -right-4">
                  <Star className="w-12 h-12 text-yellow-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-4 -left-4">
                  <Trophy className="w-12 h-12 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute -top-4 -left-4">
                  <Star className="w-10 h-10 text-yellow-300 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>
                <div className="absolute -bottom-4 -right-4">
                  <Trophy className="w-10 h-10 text-yellow-300 animate-bounce" style={{ animationDelay: '1.5s' }} />
                </div>
              </div>
            </div>

            {/* Texto animado */}
            <div className="space-y-4">
              <h2 className="text-6xl font-bold text-white drop-shadow-2xl animate-success-bounce">
                🎉 ACERTOU!
              </h2>
              <p className="text-3xl text-white drop-shadow-2xl animate-success-pulse">
                +1 Ponto!
              </p>
              <div className="text-xl text-white/80 drop-shadow-lg">
                Parabéns!
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessEffect; 