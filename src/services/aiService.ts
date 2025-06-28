import { categories } from '../data/categories';

export interface AIWordResponse {
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'ai' | 'fallback';
}

export interface AIServiceConfig {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  enableAI?: boolean;
}

class AIService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      model: 'gpt-3.5-turbo',
      maxTokens: 50,
      temperature: 0.8,
      enableAI: true,
      ...config
    };
  }

  private getPromptForCategory(category: string, difficulty: 'easy' | 'medium' | 'hard'): string {
    const categoryPrompts: Record<string, string> = {
      animals: `Gere uma palavra relacionada a ANIMAIS em português brasileiro. 
      A palavra deve ser adequada para o jogo de mímica/desenho. 
      Dificuldade: ${difficulty === 'easy' ? 'animais comuns e fáceis de desenhar' : 
                   difficulty === 'medium' ? 'animais conhecidos mas com características específicas' : 
                   'animais mais específicos ou exóticos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      movies: `Gere uma palavra relacionada a FILMES em português brasileiro. 
      Pode ser título de filme, personagem famoso, ou gênero cinematográfico.
      Dificuldade: ${difficulty === 'easy' ? 'filmes muito populares e conhecidos' : 
                   difficulty === 'medium' ? 'filmes conhecidos mas não óbvios' : 
                   'filmes cult ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      professions: `Gere uma palavra relacionada a PROFISSÕES em português brasileiro. 
      A profissão deve ser adequada para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'profissões muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'profissões conhecidas mas com elementos específicos' : 
                   'profissões mais específicas ou técnicas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      objects: `Gere uma palavra relacionada a OBJETOS do cotidiano em português brasileiro. 
      O objeto deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'objetos muito comuns e fáceis de desenhar' : 
                   difficulty === 'medium' ? 'objetos conhecidos mas com características específicas' : 
                   'objetos mais específicos ou técnicos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      food: `Gere uma palavra relacionada a COMIDAS em português brasileiro. 
      Pode ser prato, ingrediente, sobremesa ou bebida.
      Dificuldade: ${difficulty === 'easy' ? 'comidas muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'comidas conhecidas mas com elementos específicos' : 
                   'comidas mais específicas ou regionais'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      actions: `Gere uma palavra relacionada a AÇÕES/VERBOS em português brasileiro. 
      A ação deve ser adequada para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'ações muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'ações conhecidas mas com elementos específicos' : 
                   'ações mais específicas ou complexas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      places: `Gere uma palavra relacionada a LUGARES em português brasileiro. 
      O lugar deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'lugares muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'lugares conhecidos mas com características específicas' : 
                   'lugares mais específicos ou exóticos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      sports: `Gere uma palavra relacionada a ESPORTES em português brasileiro. 
      O esporte deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'esportes muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'esportes conhecidos mas com elementos específicos' : 
                   'esportes mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      emotions: `Gere uma palavra relacionada a EMOÇÕES em português brasileiro. 
      A emoção deve ser adequada para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'emoções muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'emoções conhecidas mas com elementos específicos' : 
                   'emoções mais específicas ou complexas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      technology: `Gere uma palavra relacionada a TECNOLOGIA em português brasileiro. 
      O termo deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'tecnologias muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'tecnologias conhecidas mas com elementos específicos' : 
                   'tecnologias mais específicas ou avançadas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      music: `Gere uma palavra relacionada a MÚSICA em português brasileiro. 
      Pode ser instrumento, gênero musical, ou termo musical.
      Dificuldade: ${difficulty === 'easy' ? 'músicas/instrumentos muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'músicas/instrumentos conhecidos mas com elementos específicos' : 
                   'músicas/instrumentos mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      nature: `Gere uma palavra relacionada a NATUREZA em português brasileiro. 
      O termo deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'elementos naturais muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'elementos naturais conhecidos mas com características específicas' : 
                   'elementos naturais mais específicos ou exóticos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      vehicles: `Gere uma palavra relacionada a VEÍCULOS em português brasileiro. 
      O veículo deve ser adequado para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'veículos muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'veículos conhecidos mas com características específicas' : 
                   'veículos mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      clothing: `Gere uma palavra relacionada a ROUPAS em português brasileiro. 
      A peça de roupa deve ser adequada para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'roupas muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'roupas conhecidas mas com características específicas' : 
                   'roupas mais específicas ou menos comuns'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      games: `Gere uma palavra relacionada a JOGOS em português brasileiro. 
      Pode ser nome de jogo, console, ou termo relacionado a jogos.
      Dificuldade: ${difficulty === 'easy' ? 'jogos muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'jogos conhecidos mas com elementos específicos' : 
                   'jogos mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      cartoons: `Gere uma palavra relacionada a DESENHOS ANIMADOS em português brasileiro. 
      Pode ser personagem, série, ou termo relacionado a animações.
      Dificuldade: ${difficulty === 'easy' ? 'desenhos muito populares e fáceis de representar' : 
                   difficulty === 'medium' ? 'desenhos conhecidos mas com elementos específicos' : 
                   'desenhos mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      bible: `Gere uma palavra relacionada a BÍBLIA em português brasileiro. 
      Pode ser personagem bíblico, lugar, história, ou termo religioso.
      Dificuldade: ${difficulty === 'easy' ? 'histórias e personagens muito conhecidos' : 
                   difficulty === 'medium' ? 'histórias conhecidas mas com elementos específicos' : 
                   'histórias mais específicas ou menos conhecidas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`
    };

    return categoryPrompts[category] || `Gere uma palavra relacionada a ${category} em português brasileiro. 
    A palavra deve ser adequada para o jogo de mímica/desenho. 
    Dificuldade: ${difficulty}.
    Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`;
  }

  private async callOpenAI(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('API key não configurada');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const word = data.choices[0]?.message?.content?.trim();

      if (!word) {
        throw new Error('Resposta vazia da API');
      }

      return word;
    } catch (error) {
      console.error('Erro ao chamar OpenAI:', error);
      throw error;
    }
  }

  private getFallbackWord(category: string): string {
    // Buscar a categoria no arquivo categories.ts
    const categoryData = categories.find(cat => cat.id === category);
    
    if (!categoryData || !categoryData.words || categoryData.words.length === 0) {
      // Fallback genérico se a categoria não for encontrada
      return 'palavra';
    }
    
    // Retornar uma palavra aleatória da categoria
    const randomIndex = Math.floor(Math.random() * categoryData.words.length);
    return categoryData.words[randomIndex];
  }

  private isAIAvailable(): boolean {
    return Boolean(this.config.enableAI && this.config.apiKey);
  }

  async generateWord(category: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<AIWordResponse> {
    try {
      if (this.isAIAvailable()) {
        const prompt = this.getPromptForCategory(category, difficulty);
        const word = await this.callOpenAI(prompt);
        
        return {
          word,
          category,
          difficulty,
          source: 'ai'
        };
      }
    } catch (error) {
      console.warn('Falha na geração por IA, usando fallback:', error);
    }

    // Fallback para palavras locais
    const word = this.getFallbackWord(category);
    const categoryData = categories.find(cat => cat.id === category);
    
    return {
      word,
      category,
      difficulty: categoryData?.difficulty || 'medium',
      source: 'fallback'
    };
  }

  async generateMultipleWords(category: string, count: number = 1, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<AIWordResponse[]> {
    const words: AIWordResponse[] = [];
    
    for (let i = 0; i < count; i++) {
      const word = await this.generateWord(category, difficulty);
      words.push(word);
    }
    
    return words;
  }

  generateLocalWord(category: string): AIWordResponse {
    const word = this.getFallbackWord(category);
    const categoryData = categories.find(cat => cat.id === category);
    
    return {
      word,
      category,
      difficulty: categoryData?.difficulty || 'medium',
      source: 'fallback'
    };
  }

  getAIStatus(): { available: boolean; hasApiKey: boolean; enabled: boolean } {
    return {
      available: this.isAIAvailable(),
      hasApiKey: Boolean(this.config.apiKey),
      enabled: Boolean(this.config.enableAI)
    };
  }

  setConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): AIServiceConfig {
    return { ...this.config };
  }

  toggleAI(enabled: boolean): void {
    this.config.enableAI = enabled;
  }
}

// Instância singleton
const aiService = new AIService({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  enableAI: true
});

// Funções de exportação
export const generateWord = (category: string, difficulty?: 'easy' | 'medium' | 'hard') => {
  return aiService.generateWord(category, difficulty);
};

export const generateLocalWord = (category: string) => {
  return aiService.generateLocalWord(category);
};

export const getAIStatus = () => {
  return aiService.getAIStatus();
};

export default aiService; 