import { useState, useCallback, useEffect, useRef } from "react";
import { GameState, Team, Category, GameSettings } from "../types/game";
import { categories } from "../data/categories";
import { generateWord, getAIStatus } from "../services/aiService";

const defaultTeamColors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#F43F5E",
  "#8B5A2B",
  "#6B7280",
  "#059669",
  "#7C3AED",
  "#DC2626",
  "#0891B2",
];

// Sistema de áudio otimizado
class AudioManager {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillator: OscillatorNode | null = null;
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new window.AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio não suportado:', error);
    }
  }

  private createOscillator() {
    if (!this.audioContext || !this.gainNode) return null;
    
    const oscillator = this.audioContext.createOscillator();
    oscillator.connect(this.gainNode);
    return oscillator;
  }

  playSound(type: "tick" | "warning" | "timeup" | "success") {
    if (!this.audioContext || !this.gainNode) return;

    try {
      const oscillator = this.createOscillator();
      if (!oscillator) return;

      const now = this.audioContext.currentTime;

      switch (type) {
        // case "tick":
        //   oscillator.frequency.setValueAtTime(800, now);
        //   this.gainNode.gain.setValueAtTime(0.1, now);
        //   oscillator.start(now);
        //   oscillator.stop(now + 0.1);
        //   break;

        case "warning":
          oscillator.frequency.setValueAtTime(1000, now);
          this.gainNode.gain.setValueAtTime(0.15, now);
          oscillator.start(now);
          oscillator.stop(now + 0.15);
          break;

        case "timeup":
          oscillator.frequency.setValueAtTime(400, now);
          oscillator.frequency.setValueAtTime(200, now + 0.3);
          this.gainNode.gain.setValueAtTime(0.2, now);
          oscillator.start(now);
          oscillator.stop(now + 0.6);
          break;

        case "success":
          // Melodia de sucesso: Do-Mi-Sol
          oscillator.frequency.setValueAtTime(523, now); // Do
          oscillator.frequency.setValueAtTime(659, now + 0.1); // Mi
          oscillator.frequency.setValueAtTime(784, now + 0.2); // Sol
          this.gainNode.gain.setValueAtTime(0.15, now);
          oscillator.start(now);
          oscillator.stop(now + 0.4);
          break;
      }
    } catch (error) {
      console.warn('Erro ao tocar som:', error);
    }
  }

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    teams: [],
    currentTeam: 0,
    currentWord: "",
    currentCategory: null,
    timeLeft: 60,
    isPlaying: false,
    isPaused: false,
    round: 1,
    selectedCategories: ["animals", "movies", "professions"],
    timerDuration: 60,
    gameStarted: false,
  });

  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [aiStatus, setAiStatus] = useState(getAIStatus());
  const audioManagerRef = useRef<AudioManager>(new AudioManager());

  const createTeams = useCallback((teamNames: string[]): Team[] => {
    return teamNames.map((name, index) => ({
      id: `team-${index}`,
      name: name.trim() || `Grupo ${index + 1}`,
      color: defaultTeamColors[index % defaultTeamColors.length],
      score: 0,
    }));
  }, []);

  const getRandomWord = useCallback(
    async (categoryIds: string[]): Promise<{ word: string; category: Category; source: 'ai' | 'fallback' }> => {
      const availableCategories = categories.filter((cat) =>
        categoryIds.includes(cat.id)
      );
      const randomCategory =
        availableCategories[
          Math.floor(Math.random() * availableCategories.length)
        ];
      
      try {
        const result = await generateWord(randomCategory.id);
        return { 
          word: result.word, 
          category: randomCategory,
          source: result.source
        };
      } catch (error) {
        console.error('Erro ao gerar palavra:', error);
        // Fallback para palavras locais em caso de erro
        const fallbackWords = randomCategory.words;
        const randomWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
        return { 
          word: randomWord, 
          category: randomCategory,
          source: 'fallback'
        };
      }
    },
    []
  );

  const playSound = useCallback(
    (type: "tick" | "warning" | "timeup" | "success") => {
      audioManagerRef.current.playSound(type);
    },
    []
  );

  const startGame = useCallback(
    async (settings: GameSettings) => {
      const { word, category, source } = await getRandomWord(settings.selectedCategories);

      setGameState((prev) => ({
        ...prev,
        teams: settings.teams,
        selectedCategories: settings.selectedCategories,
        timerDuration: settings.timerDuration,
        timeLeft: settings.timerDuration,
        currentWord: word,
        currentCategory: category,
        gameStarted: true,
        currentTeam: 0,
        round: 1,
      }));

      // Log da fonte da palavra para debug
      console.log(`Palavra gerada: "${word}" (${source})`);
    },
    [getRandomWord]
  );

  const startTimer = useCallback(() => {
    if (intervalId) clearInterval(intervalId);

    setGameState((prev) => ({ ...prev, isPlaying: true, isPaused: false }));

    const id = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          playSound("timeup");
          return { ...prev, timeLeft: 0, isPlaying: false };
        }

        if (prev.timeLeft <= 10) {
          playSound("warning");
        } else if (prev.timeLeft <= 30) {
          playSound("tick");
        }

        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    setIntervalId(id);
  }, [intervalId, playSound]);

  const pauseTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameState((prev) => ({ ...prev, isPlaying: false, isPaused: true }));
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameState((prev) => ({
      ...prev,
      timeLeft: prev.timerDuration,
      isPlaying: false,
      isPaused: false,
    }));
  }, [intervalId]);

  const correctAnswer = useCallback(() => {
    playSound("success");
    setGameState((prev) => {
      const newTeams = [...prev.teams];
      newTeams[prev.currentTeam].score += 1;

      return { ...prev, teams: newTeams };
    });
  }, [playSound]);

  const skipWord = useCallback(async () => {
    const { word, category, source } = await getRandomWord(gameState.selectedCategories);
    setGameState((prev) => ({
      ...prev,
      currentWord: word,
      currentCategory: category,
    }));
    console.log(`Palavra pulada: "${word}" (${source})`);
  }, [getRandomWord, gameState.selectedCategories]);

  const nextTurn = useCallback(async () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const { word, category, source } = await getRandomWord(gameState.selectedCategories);

    setGameState((prev) => {
      const nextTeamIndex = (prev.currentTeam + 1) % prev.teams.length;
      const newRound = nextTeamIndex === 0 ? prev.round + 1 : prev.round;

      return {
        ...prev,
        currentTeam: nextTeamIndex,
        round: newRound,
        currentWord: word,
        currentCategory: category,
        timeLeft: prev.timerDuration,
        isPlaying: false,
        isPaused: false,
      };
    });

    console.log(`Nova palavra: "${word}" (${source})`);
  }, [intervalId, getRandomWord, gameState.selectedCategories]);

  const resetGame = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((team) => ({ ...team, score: 0 })),
      currentTeam: 0,
      round: 1,
      timeLeft: prev.timerDuration,
      isPlaying: false,
      isPaused: false,
      gameStarted: false,
    }));
  }, [intervalId]);

  // Inicializar áudio quando o componente montar
  useEffect(() => {
    audioManagerRef.current.init();
  }, []);

  // Função para ativar o áudio (chamada pelo AudioActivator)
  const activateAudio = useCallback(() => {
    audioManagerRef.current.resume();
  }, []);

  // Atualiza o status da IA periodicamente
  useEffect(() => {
    const updateAIStatus = () => {
      setAiStatus(getAIStatus());
    };

    updateAIStatus();
    const interval = setInterval(updateAIStatus, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState.timeLeft === 0 && gameState.isPlaying) {
      // Auto next turn when time is up
      setTimeout(() => {
        nextTurn();
      }, 1000);
    }
  }, [gameState.timeLeft, gameState.isPlaying, nextTurn]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return {
    gameState,
    aiStatus,
    activateAudio,
    createTeams,
    startGame,
    startTimer,
    pauseTimer,
    resetTimer,
    correctAnswer,
    skipWord,
    nextTurn,
    resetGame,
  };
};
