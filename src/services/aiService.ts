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
  private fallbackWords: Record<string, string[]> = {
    animals: [
      'elefante', 'girafa', 'leão', 'macaco', 'pinguim', 'borboleta', 
      'cobra', 'águia', 'tubarão', 'golfinho', 'coelho', 'tartaruga',
      'canguru', 'zebra', 'rinoceronte', 'hipopótamo', 'flamingo', 
      'pavão', 'coruja', 'beija-flor', 'preguiça', 'tamanduá',
      'polvo', 'caranguejo', 'libélula', 'morcego', 'esquilo', 'raposa',
      'tigre', 'urso', 'lobo', 'raposa', 'cervo', 'javali', 'porco-espinho',
      'toupeira', 'rato', 'camundongo', 'hamster', 'gerbil', 'chinchila',
      'furão', 'doninha', 'texugo', 'guaxinim', 'lontra', 'castor', 'capivara'
    ],
    movies: [
      'Titanic', 'Avatar', 'Vingadores', 'Frozen', 'Batman', 'Superman',
      'Harry Potter', 'Star Wars', 'Jurassic Park', 'Matrix', 'Toy Story',
      'Shrek', 'Procurando Nemo', 'Rei Leão', 'Cidade Maravilhosa',
      'Tropa de Elite', 'Central do Brasil', 'Dona Flor', 'Carandiru',
      'Cidade de Deus', 'Elite Squad', 'Fast Five', 'Velozes e Furiosos',
      'Interestelar', 'Inception', 'O Senhor dos Anéis', 'Piratas do Caribe',
      'Mad Max', 'Madagascar', 'Kung Fu Panda', 'Como Treinar Seu Dragão',
      'Divertidamente', 'Zootopia', 'Moana', 'Encanto', 'Luca', 'Soul'
    ],
    professions: [
      'médico', 'professor', 'bombeiro', 'policial', 'cozinheiro', 'dentista',
      'enfermeiro', 'advogado', 'engenheiro', 'arquiteto', 'jornalista',
      'veterinário', 'farmacêutico', 'piloto', 'motorista', 'garçom',
      'cabeleireiro', 'fotógrafo', 'músico', 'pintor', 'escritor',
      'programador', 'designer', 'psicólogo', 'fisioterapeuta', 'contador',
      'eletricista', 'encanador', 'pedreiro', 'carpinteiro', 'mecânico',
      'vendedor', 'recepcionista', 'secretária', 'administrador', 'gerente',
      'diretor', 'presidente', 'empresário', 'investidor', 'consultor'
    ],
    objects: [
      'guarda-chuva', 'óculos', 'relógio', 'chave', 'telefone', 'computador',
      'televisão', 'geladeira', 'micro-ondas', 'aspirador', 'ferro de passar',
      'secador', 'escova de dentes', 'sabonete', 'toalha', 'travesseiro',
      'cobertor', 'cadeira', 'mesa', 'luminária', 'vaso', 'quadro',
      'espelho', 'ventilador', 'ar condicionado', 'liquidificador',
      'batedeira', 'panela', 'frigideira', 'prato', 'copo', 'garfo', 'faca',
      'colher', 'faca de pão', 'ralador', 'peneira', 'tábua de corte'
    ],
    food: [
      'pizza', 'hambúrguer', 'macarrão', 'arroz', 'feijão', 'salada',
      'sorvete', 'chocolate', 'bolo', 'biscoito', 'pão', 'queijo',
      'presunto', 'frango', 'carne', 'peixe', 'banana', 'maçã',
      'laranja', 'uva', 'morango', 'abacaxi', 'melancia', 'manga',
      'brigadeiro', 'açaí', 'tapioca', 'coxinha', 'pastel', 'feijoada',
      'moqueca', 'vatapá', 'caruru', 'acarajé', 'pão de queijo', 'empada',
      'quindim', 'canjica', 'pudim', 'mousse', 'torta', 'sanduíche'
    ],
    actions: [
      'correr', 'pular', 'dançar', 'nadar', 'voar', 'dirigir', 'cozinhar',
      'limpar', 'estudar', 'trabalhar', 'dormir', 'acordar', 'escutar',
      'falar', 'escrever', 'ler', 'desenhar', 'pintar', 'cantar',
      'tocar instrumento', 'meditar', 'exercitar', 'abraçar', 'beijar',
      'escalar', 'mergulhar', 'surfar', 'esquiar', 'patinar', 'jogar',
      'brincar', 'rir', 'chorar', 'gritar', 'sussurrar', 'assobiar'
    ],
    places: [
      'escola', 'hospital', 'supermercado', 'shopping', 'cinema', 'teatro',
      'museu', 'biblioteca', 'parque', 'praia', 'montanha', 'floresta',
      'deserto', 'cidade', 'fazenda', 'aeroporto', 'estação', 'hotel',
      'restaurante', 'igreja', 'banco', 'correios', 'farmácia',
      'academia', 'salão de beleza', 'padaria', 'açougue', 'posto',
      'loja', 'mercado', 'feira', 'praça', 'rua', 'avenida', 'rodovia'
    ],
    sports: [
      'futebol', 'basquete', 'vôlei', 'tênis', 'natação', 'corrida',
      'ciclismo', 'boxe', 'judô', 'karatê', 'ginástica', 'atletismo',
      'surfe', 'skate', 'escalada', 'golfe', 'ping pong', 'badminton',
      'handebol', 'rugby', 'hockey', 'polo aquático', 'esgrima',
      'beisebol', 'softball', 'críquete', 'lacrosse', 'paintball'
    ],
    emotions: [
      'felicidade', 'tristeza', 'raiva', 'medo', 'surpresa', 'nojo',
      'amor', 'ódio', 'ciúme', 'inveja', 'vergonha', 'orgulho',
      'ansiedade', 'calma', 'excitação', 'tédio', 'nostalgia',
      'esperança', 'desespero', 'gratidão', 'frustração', 'alívio',
      'alegria', 'contentamento', 'satisfação', 'euforia', 'entusiasmo'
    ],
    technology: [
      'smartphone', 'tablet', 'notebook', 'smartwatch', 'fone de ouvido',
      'carregador', 'mouse', 'teclado', 'monitor', 'impressora',
      'roteador', 'pendrive', 'HD externo', 'webcam', 'microfone',
      'drone', 'realidade virtual', 'inteligência artificial',
      'bluetooth', 'wifi', 'aplicativo', 'software', 'hardware',
      'processador', 'memória RAM', 'placa de vídeo', 'SSD', 'HD'
    ],
    music: [
      'violão', 'piano', 'bateria', 'guitarra', 'baixo', 'flauta',
      'saxofone', 'trompete', 'violino', 'harpa', 'acordeon',
      'rock', 'pop', 'samba', 'forró', 'funk', 'rap', 'jazz',
      'clássica', 'eletrônica', 'reggae', 'blues', 'country',
      'sertanejo', 'pagode', 'axé', 'MPB', 'bossa nova', 'tango'
    ],
    nature: [
      'árvore', 'flor', 'grama', 'folha', 'galho', 'raiz', 'semente',
      'sol', 'lua', 'estrela', 'nuvem', 'chuva', 'vento', 'neve',
      'rio', 'lago', 'mar', 'oceano', 'cachoeira', 'ilha',
      'vulcão', 'terremoto', 'furacão', 'arco-íris', 'relâmpago',
      'trovão', 'granizo', 'geada', 'orvalho', 'neblina', 'tempestade'
    ],
    vehicles: [
      'carro', 'moto', 'bicicleta', 'ônibus', 'caminhão', 'trem',
      'avião', 'helicóptero', 'barco', 'navio', 'submarino',
      'foguete', 'ambulância', 'bombeiro', 'polícia', 'táxi',
      'uber', 'patinete', 'skate', 'patins', 'jet ski', 'lancha',
      'iate', 'canoa', 'jangada', 'balsa', 'ferry', 'metrô'
    ],
    clothing: [
      'camiseta', 'calça', 'shorts', 'vestido', 'saia', 'blusa',
      'jaqueta', 'casaco', 'suéter', 'moletom', 'camisa', 'gravata',
      'sapato', 'tênis', 'sandália', 'chinelo', 'bota', 'meia',
      'cueca', 'calcinha', 'sutiã', 'pijama', 'maiô', 'biquíni',
      'boné', 'chapéu', 'gorro', 'cachecol', 'luvas', 'cinto'
    ],
    games: [
      'futebol de botão', 'xadrez', 'damas', 'dominó', 'baralho',
      'uno', 'monopoly', 'war', 'banco imobiliário', 'ludo',
      'videogame', 'playstation', 'xbox', 'nintendo', 'pc gamer',
      'minecraft', 'fortnite', 'among us', 'free fire', 'fifa',
      'pokemon', 'mario', 'sonic', 'tetris', 'pac-man', 'space invaders'
    ]
  };

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
      Pode ser modalidade esportiva, equipamento ou termo relacionado.
      Dificuldade: ${difficulty === 'easy' ? 'esportes muito populares e fáceis de representar' : 
                   difficulty === 'medium' ? 'esportes conhecidos mas com elementos específicos' : 
                   'esportes mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      emotions: `Gere uma palavra relacionada a EMOÇÕES/SENTIMENTOS em português brasileiro. 
      A emoção deve ser adequada para o jogo de mímica/desenho.
      Dificuldade: ${difficulty === 'easy' ? 'emoções básicas e fáceis de representar' : 
                   difficulty === 'medium' ? 'emoções conhecidas mas com nuances específicas' : 
                   'emoções mais complexas ou específicas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      technology: `Gere uma palavra relacionada a TECNOLOGIA em português brasileiro. 
      Pode ser dispositivo, aplicativo, conceito tecnológico.
      Dificuldade: ${difficulty === 'easy' ? 'tecnologias muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'tecnologias conhecidas mas com elementos específicos' : 
                   'tecnologias mais avançadas ou específicas'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      music: `Gere uma palavra relacionada a MÚSICA em português brasileiro. 
      Pode ser instrumento, gênero musical, termo musical.
      Dificuldade: ${difficulty === 'easy' ? 'elementos musicais muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'elementos musicais conhecidos mas com características específicas' : 
                   'elementos musicais mais específicos ou técnicos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      nature: `Gere uma palavra relacionada a NATUREZA em português brasileiro. 
      Pode ser elemento natural, fenômeno, paisagem.
      Dificuldade: ${difficulty === 'easy' ? 'elementos naturais muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'elementos naturais conhecidos mas com características específicas' : 
                   'elementos naturais mais específicos ou exóticos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      vehicles: `Gere uma palavra relacionada a VEÍCULOS em português brasileiro. 
      Pode ser tipo de transporte, marca, modelo.
      Dificuldade: ${difficulty === 'easy' ? 'veículos muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'veículos conhecidos mas com características específicas' : 
                   'veículos mais específicos ou menos comuns'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      clothing: `Gere uma palavra relacionada a ROUPAS/VESTUÁRIO em português brasileiro. 
      Pode ser peça de roupa, acessório, tipo de vestimenta.
      Dificuldade: ${difficulty === 'easy' ? 'roupas muito comuns e fáceis de representar' : 
                   difficulty === 'medium' ? 'roupas conhecidas mas com características específicas' : 
                   'roupas mais específicas ou menos comuns'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`,
      
      games: `Gere uma palavra relacionada a JOGOS em português brasileiro. 
      Pode ser jogo de tabuleiro, videogame, esporte, brincadeira.
      Dificuldade: ${difficulty === 'easy' ? 'jogos muito populares e fáceis de representar' : 
                   difficulty === 'medium' ? 'jogos conhecidos mas com elementos específicos' : 
                   'jogos mais específicos ou menos conhecidos'}.
      Responda APENAS com a palavra, sem aspas, pontuação ou explicações.`
    };

    return categoryPrompts[category] || categoryPrompts.objects;
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
              role: 'system',
              content: 'Você é um assistente especializado em gerar palavras para jogos de mímica e desenho. Sempre responda apenas com a palavra solicitada, sem aspas, pontuação ou explicações adicionais.'
            },
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
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('Erro ao chamar OpenAI:', error);
      throw error;
    }
  }

  private getFallbackWord(category: string): string {
    const words = this.fallbackWords[category] || this.fallbackWords.objects;
    return words[Math.floor(Math.random() * words.length)];
  }

  private isAIAvailable(): boolean {
    return !!(this.config.enableAI && !!this.config.apiKey);
  }

  async generateWord(category: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<AIWordResponse> {
    // Verifica se a IA está disponível
    if (!this.isAIAvailable()) {
      console.log('IA não disponível, usando palavras locais');
      return {
        word: this.getFallbackWord(category),
        category,
        difficulty,
        source: 'fallback'
      };
    }

    try {
      const prompt = this.getPromptForCategory(category, difficulty);
      const word = await this.callOpenAI(prompt);
      
      // Valida se a palavra retornada é válida
      if (word && word.length > 0 && word.length < 50) {
        return {
          word: word,
          category,
          difficulty,
          source: 'ai'
        };
      } else {
        throw new Error('Palavra inválida retornada pela IA');
      }
    } catch (error) {
      console.warn('Erro ao gerar palavra com IA, usando fallback:', error);
      return {
        word: this.getFallbackWord(category),
        category,
        difficulty,
        source: 'fallback'
      };
    }
  }

  async generateMultipleWords(category: string, count: number = 1, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<AIWordResponse[]> {
    const words: AIWordResponse[] = [];
    
    for (let i = 0; i < count; i++) {
      const word = await this.generateWord(category, difficulty);
      words.push(word);
    }
    
    return words;
  }

  // Método para forçar o uso apenas de palavras locais
  generateLocalWord(category: string): AIWordResponse {
    return {
      word: this.getFallbackWord(category),
      category,
      difficulty: 'medium',
      source: 'fallback'
    };
  }

  // Método para verificar status da IA
  getAIStatus(): { available: boolean; hasApiKey: boolean; enabled: boolean } {
    return {
      available: this.isAIAvailable(),
      hasApiKey: !!this.config.apiKey,
      enabled: Boolean(this.config.enableAI)
    };
  }

  setConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): AIServiceConfig {
    return { ...this.config };
  }

  // Método para alternar entre IA e local
  toggleAI(enabled: boolean): void {
    this.config.enableAI = enabled;
  }
}

// Instância singleton com configuração automática
export const aiService = new AIService({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  enableAI: !!import.meta.env.VITE_OPENAI_API_KEY,
});

// Função helper para facilitar o uso
export const generateWord = (category: string, difficulty?: 'easy' | 'medium' | 'hard') => {
  return aiService.generateWord(category, difficulty);
};

// Função helper para gerar apenas palavras locais
export const generateLocalWord = (category: string) => {
  return aiService.generateLocalWord(category);
};

// Função helper para verificar status
export const getAIStatus = () => {
  return aiService.getAIStatus();
};

export default AIService; 