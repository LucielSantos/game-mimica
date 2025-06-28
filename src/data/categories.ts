import { Category } from '../types/game';

export const categories: Category[] = [
  {
    id: 'animals',
    name: 'Animais',
    difficulty: 'easy',
    icon: '🐾',
    words: [
      'elefante', 'girafa', 'leão', 'macaco', 'pinguim', 'borboleta', 
      'cobra', 'águia', 'tubarão', 'golfinho', 'coelho', 'tartaruga',
      'canguru', 'zebra', 'rinoceronte', 'hipopótamo', 'flamingo', 
      'pavão', 'coruja', 'beija-flor', 'preguiça', 'tamanduá',
      'polvo', 'caranguejo', 'libélula', 'morcego', 'esquilo', 'raposa'
    ]
  },
  {
    id: 'movies',
    name: 'Filmes',
    difficulty: 'medium',
    icon: '🎬',
    words: [
      'Titanic', 'Avatar', 'Vingadores', 'Frozen', 'Batman', 'Superman',
      'Harry Potter', 'Star Wars', 'Jurassic Park', 'Matrix', 'Toy Story',
      'Shrek', 'Procurando Nemo', 'Rei Leão', 'Cidade Maravilhosa',
      'Tropa de Elite', 'Central do Brasil', 'Dona Flor', 'Carandiru',
      'Cidade de Deus', 'Elite Squad', 'Fast Five', 'Velozes e Furiosos'
    ]
  },
  {
    id: 'professions',
    name: 'Profissões',
    difficulty: 'easy',
    icon: '👩‍💼',
    words: [
      'médico', 'professor', 'bombeiro', 'policial', 'cozinheiro', 'dentista',
      'enfermeiro', 'advogado', 'engenheiro', 'arquiteto', 'jornalista',
      'veterinário', 'farmacêutico', 'piloto', 'motorista', 'garçom',
      'cabeleireiro', 'fotógrafo', 'músico', 'pintor', 'escritor',
      'programador', 'designer', 'psicólogo', 'fisioterapeuta', 'contador'
    ]
  },
  {
    id: 'objects',
    name: 'Objetos',
    difficulty: 'medium',
    icon: '📱',
    words: [
      'guarda-chuva', 'óculos', 'relógio', 'chave', 'telefone', 'computador',
      'televisão', 'geladeira', 'micro-ondas', 'aspirador', 'ferro de passar',
      'secador', 'escova de dentes', 'sabonete', 'toalha', 'travesseiro',
      'cobertor', 'cadeira', 'mesa', 'luminária', 'vaso', 'quadro',
      'espelho', 'ventilador', 'ar condicionado', 'liquidificador'
    ]
  },
  {
    id: 'food',
    name: 'Comidas',
    difficulty: 'easy',
    icon: '🍕',
    words: [
      'pizza', 'hambúrguer', 'macarrão', 'arroz', 'feijão', 'salada',
      'sorvete', 'chocolate', 'bolo', 'biscoito', 'pão', 'queijo',
      'presunto', 'frango', 'carne', 'peixe', 'banana', 'maçã',
      'laranja', 'uva', 'morango', 'abacaxi', 'melancia', 'manga',
      'brigadeiro', 'açaí', 'tapioca', 'coxinha', 'pastel', 'feijoada'
    ]
  },
  {
    id: 'actions',
    name: 'Ações',
    difficulty: 'hard',
    icon: '🏃',
    words: [
      'correr', 'pular', 'dançar', 'nadar', 'voar', 'dirigir', 'cozinhar',
      'limpar', 'estudar', 'trabalhar', 'dormir', 'acordar', 'escutar',
      'falar', 'escrever', 'ler', 'desenhar', 'pintar', 'cantar',
      'tocar instrumento', 'meditar', 'exercitar', 'abraçar', 'beijar',
      'escalar', 'mergulhar', 'surfar', 'esquiar', 'patinar'
    ]
  },
  {
    id: 'places',
    name: 'Lugares',
    difficulty: 'medium',
    icon: '🏛️',
    words: [
      'escola', 'hospital', 'supermercado', 'shopping', 'cinema', 'teatro',
      'museu', 'biblioteca', 'parque', 'praia', 'montanha', 'floresta',
      'deserto', 'cidade', 'fazenda', 'aeroporto', 'estação', 'hotel',
      'restaurante', 'igreja', 'banco', 'correios', 'farmácia',
      'academia', 'salão de beleza', 'padaria', 'açougue', 'posto'
    ]
  },
  {
    id: 'sports',
    name: 'Esportes',
    difficulty: 'easy',
    icon: '⚽',
    words: [
      'futebol', 'basquete', 'vôlei', 'tênis', 'natação', 'corrida',
      'ciclismo', 'boxe', 'judô', 'karatê', 'ginástica', 'atletismo',
      'surfe', 'skate', 'escalada', 'golfe', 'ping pong', 'badminton',
      'handebol', 'rugby', 'hockey', 'polo aquático', 'esgrima'
    ]
  },
  {
    id: 'emotions',
    name: 'Emoções',
    difficulty: 'hard',
    icon: '😊',
    words: [
      'felicidade', 'tristeza', 'raiva', 'medo', 'surpresa', 'nojo',
      'amor', 'ódio', 'ciúme', 'inveja', 'vergonha', 'orgulho',
      'ansiedade', 'calma', 'excitação', 'tédio', 'nostalgia',
      'esperança', 'desespero', 'gratidão', 'frustração', 'alívio'
    ]
  },
  {
    id: 'technology',
    name: 'Tecnologia',
    difficulty: 'medium',
    icon: '💻',
    words: [
      'smartphone', 'tablet', 'notebook', 'smartwatch', 'fone de ouvido',
      'carregador', 'mouse', 'teclado', 'monitor', 'impressora',
      'roteador', 'pendrive', 'HD externo', 'webcam', 'microfone',
      'drone', 'realidade virtual', 'inteligência artificial',
      'bluetooth', 'wifi', 'aplicativo', 'software', 'hardware'
    ]
  },
  {
    id: 'music',
    name: 'Música',
    difficulty: 'medium',
    icon: '🎵',
    words: [
      'violão', 'piano', 'bateria', 'guitarra', 'baixo', 'flauta',
      'saxofone', 'trompete', 'violino', 'harpa', 'acordeon',
      'rock', 'pop', 'samba', 'forró', 'funk', 'rap', 'jazz',
      'clássica', 'eletrônica', 'reggae', 'blues', 'country'
    ]
  },
  {
    id: 'nature',
    name: 'Natureza',
    difficulty: 'easy',
    icon: '🌿',
    words: [
      'árvore', 'flor', 'grama', 'folha', 'galho', 'raiz', 'semente',
      'sol', 'lua', 'estrela', 'nuvem', 'chuva', 'vento', 'neve',
      'rio', 'lago', 'mar', 'oceano', 'cachoeira', 'ilha',
      'vulcão', 'terremoto', 'furacão', 'arco-íris', 'relâmpago'
    ]
  },
  {
    id: 'vehicles',
    name: 'Veículos',
    difficulty: 'easy',
    icon: '🚗',
    words: [
      'carro', 'moto', 'bicicleta', 'ônibus', 'caminhão', 'trem',
      'avião', 'helicóptero', 'barco', 'navio', 'submarino',
      'foguete', 'ambulância', 'bombeiro', 'polícia', 'táxi',
      'uber', 'patinete', 'skate', 'patins', 'jet ski', 'lancha'
    ]
  },
  {
    id: 'clothing',
    name: 'Roupas',
    difficulty: 'easy',
    icon: '👕',
    words: [
      'camiseta', 'calça', 'shorts', 'vestido', 'saia', 'blusa',
      'jaqueta', 'casaco', 'suéter', 'moletom', 'camisa', 'gravata',
      'sapato', 'tênis', 'sandália', 'chinelo', 'bota', 'meia',
      'cueca', 'calcinha', 'sutiã', 'pijama', 'maiô', 'biquíni'
    ]
  },
  {
    id: 'games',
    name: 'Jogos',
    difficulty: 'medium',
    icon: '🎮',
    words: [
      'futebol de botão', 'xadrez', 'damas', 'dominó', 'baralho',
      'uno', 'monopoly', 'war', 'banco imobiliário', 'ludo',
      'videogame', 'playstation', 'xbox', 'nintendo', 'pc gamer',
      'minecraft', 'fortnite', 'among us', 'free fire', 'fifa'
    ]
  }
];