export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface Category {
  id: string;
  name: string;
  words: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface GameState {
  teams: Team[];
  currentTeam: number;
  currentWord: string;
  currentCategory: Category | null;
  timeLeft: number;
  isPlaying: boolean;
  isPaused: boolean;
  round: number;
  selectedCategories: string[];
  timerDuration: number;
  gameStarted: boolean;
}

export interface GameSettings {
  timerDuration: number;
  selectedCategories: string[];
  teams: Team[];
}