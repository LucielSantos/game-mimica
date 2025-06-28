import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface ScorePopupProps {
  isActive: boolean;
  teamColor: string;
  onComplete?: () => void;
}

export const ScorePopup: React.FC<ScorePopupProps> = ({ 
  isActive, 
  teamColor, 
  onComplete 
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShow(false);
      return;
    }

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!false) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 pointer-events-none">
      <div 
        className="bg-white rounded-2xl shadow-2xl p-6 transform animate-success-bounce"
        style={{ 
          border: `3px solid ${teamColor}`,
          boxShadow: `0 0 30px ${teamColor}40`
        }}
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: teamColor }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">+1</div>
            <div className="text-sm text-gray-600">Ponto!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePopup; 