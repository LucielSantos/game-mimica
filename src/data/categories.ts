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
      'polvo', 'caranguejo', 'libélula', 'morcego', 'esquilo', 'raposa',
      'tigre', 'urso', 'lobo', 'cervo', 'javali', 'porco-espinho',
      'toupeira', 'rato', 'camundongo', 'hamster', 'gerbil', 'chinchila',
      'furão', 'doninha', 'texugo', 'guaxinim', 'lontra', 'castor', 'capivara',
      'alpaca', 'lhama', 'vicunha', 'guanaco', 'búfalo', 'antílope',
      'gazela', 'impala', 'gnu', 'búfalo-africano', 'elefante-marinho',
      'foca', 'leão-marinho', 'morsa', 'baleia', 'orca', 'golfinho-nariz-de-garrafa'
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
      'Cidade de Deus', 'Elite Squad', 'Fast Five', 'Velozes e Furiosos',
      'Interestelar', 'Inception', 'O Senhor dos Anéis', 'Piratas do Caribe',
      'Mad Max', 'Madagascar', 'Kung Fu Panda', 'Como Treinar Seu Dragão',
      'Divertidamente', 'Zootopia', 'Moana', 'Encanto', 'Luca', 'Soul',
      'Coringa', 'Vingadores Ultimato', 'Pantera Negra', 'Homem-Aranha',
      'Homem de Ferro', 'Capitão América', 'Thor', 'Hulk', 'Viúva Negra',
      'Doutor Estranho', 'Guardiões da Galáxia', 'Os Incríveis', 'Monstros S.A.',
      'Carros', 'Ratatouille', 'Wall-E', 'Up', 'Vida de Inseto', 'A Bela e a Fera'
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
      'programador', 'designer', 'psicólogo', 'fisioterapeuta', 'contador',
      'eletricista', 'encanador', 'pedreiro', 'carpinteiro', 'mecânico',
      'vendedor', 'recepcionista', 'secretária', 'administrador', 'gerente',
      'diretor', 'presidente', 'empresário', 'investidor', 'consultor',
      'atendente', 'caixa', 'estoquista', 'entregador', 'porteiro',
      'segurança', 'guarda', 'soldado', 'marinheiro', 'policial federal',
      'detetive', 'investigador', 'perito', 'legista', 'coronel'
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
      'espelho', 'ventilador', 'ar condicionado', 'liquidificador',
      'batedeira', 'panela', 'frigideira', 'prato', 'copo', 'garfo', 'faca',
      'colher', 'faca de pão', 'ralador', 'peneira', 'tábua de corte',
      'faca de cozinha', 'abridor de lata', 'abridor de garrafa', 'rolo de massa',
      'bacia', 'pote', 'tampa', 'pano de prato', 'lixeira', 'vassoura',
      'rodo', 'balde', 'esponja', 'detergente', 'sabão em pó', 'amaciante'
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
      'brigadeiro', 'açaí', 'tapioca', 'coxinha', 'pastel', 'feijoada',
      'moqueca', 'vatapá', 'caruru', 'acarajé', 'pão de queijo', 'empada',
      'quindim', 'canjica', 'pudim', 'mousse', 'torta', 'sanduíche',
      'lasanha', 'strogonoff', 'parmegiana', 'milanesa', 'bife', 'filé',
      'costela', 'linguiça', 'salsicha', 'mortadela', 'salame', 'provolone',
      'gorgonzola', 'ricota', 'cottage', 'iogurte', 'leite', 'manteiga'
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
      'escalar', 'mergulhar', 'surfar', 'esquiar', 'patinar', 'jogar',
      'brincar', 'rir', 'chorar', 'gritar', 'sussurrar', 'assobiar',
      'bater palmas', 'apontar', 'acenar', 'piscar', 'piscar o olho',
      'fazer careta', 'dar risada', 'suspirar', 'bocejar', 'espirrar',
      'tossir', 'engolir', 'mastigar', 'beber', 'comer', 'coçar',
      'coçar a cabeça', 'coçar o nariz', 'coçar a orelha', 'coçar o braço'
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
      'academia', 'salão de beleza', 'padaria', 'açougue', 'posto',
      'loja', 'mercado', 'feira', 'praça', 'rua', 'avenida', 'rodovia',
      'ponte', 'túnel', 'viaduto', 'rotatória', 'semáforo', 'faixa de pedestre',
      'estacionamento', 'garagem', 'depósito', 'armazém', 'galpão',
      'sítio', 'chácara', 'rancho', 'haras', 'zoológico', 'aquário',
      'planetário', 'observatório', 'laboratório', 'clínica', 'consultório'
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
      'handebol', 'rugby', 'hockey', 'polo aquático', 'esgrima',
      'beisebol', 'softball', 'críquete', 'lacrosse', 'paintball',
      'futebol americano', 'futebol de salão', 'futebol de areia',
      'beach tennis', 'beach volleyball', 'windsurf', 'kitesurf',
      'remo', 'canoagem', 'rafting', 'parapente', 'asa delta',
      'paraquedismo', 'bungee jumping', 'parkour', 'capoeira', 'muay thai'
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
      'esperança', 'desespero', 'gratidão', 'frustração', 'alívio',
      'alegria', 'contentamento', 'satisfação', 'euforia', 'entusiasmo',
      'decepção', 'desapontamento', 'confusão', 'curiosidade', 'admiração',
      'revolta', 'indignação', 'irritação', 'nervosismo', 'tensão',
      'relaxamento', 'tranquilidade', 'paz', 'serenidade', 'plenitude',
      'vazio', 'solidão', 'melancolia', 'saudade', 'lembrança'
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
      'bluetooth', 'wifi', 'aplicativo', 'software', 'hardware',
      'processador', 'memória RAM', 'placa de vídeo', 'SSD', 'HD',
      'servidor', 'nuvem', 'backup', 'firewall', 'antivírus',
      'câmera digital', 'projetor', 'alto-falante', 'subwoofer',
      'amplificador', 'mesa de som', 'microfone sem fio', 'headset',
      'webcam HD', 'scanner', 'plotter', 'impressora 3D', 'robô'
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
      'clássica', 'eletrônica', 'reggae', 'blues', 'country',
      'sertanejo', 'pagode', 'axé', 'MPB', 'bossa nova', 'tango',
      'valsa', 'polca', 'marcha', 'hino', 'coral', 'ópera',
      'sinfonia', 'concerto', 'sonata', 'fuga', 'prelúdio', 'intermezzo',
      'cavaco', 'pandeiro', 'surdo', 'tamborim', 'agogô', 'cuíca',
      'berimbau', 'atabaque', 'ganzá', 'reco-reco', 'chocalho'
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
      'vulcão', 'terremoto', 'furacão', 'arco-íris', 'relâmpago',
      'trovão', 'granizo', 'geada', 'orvalho', 'neblina', 'tempestade',
      'aurora boreal', 'eclipse', 'meteoro', 'cometa', 'planeta',
      'galáxia', 'constelação', 'via láctea', 'buraco negro', 'supernova',
      'rocha', 'pedra', 'areia', 'terra', 'barro', 'argila',
      'cristal', 'diamante', 'ouro', 'prata', 'bronze', 'ferro'
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
      'uber', 'patinete', 'skate', 'patins', 'jet ski', 'lancha',
      'iate', 'canoa', 'jangada', 'balsa', 'ferry', 'metrô',
      'trem bala', 'trem de carga', 'locomotiva', 'vagão', 'bondinho',
      'teleférico', 'funicular', 'monotrilho', 'tram', 'bonde',
      'carroça', 'charrete', 'carro de boi', 'carro de mão', 'carrinho',
      'trator', 'colheitadeira', 'escavadeira', 'guindaste', 'betoneira'
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
      'cueca', 'calcinha', 'sutiã', 'pijama', 'maiô', 'biquíni',
      'boné', 'chapéu', 'gorro', 'cachecol', 'luvas', 'cinto',
      'carteira', 'bolsa', 'mochila', 'mala', 'pasta', 'porta-documentos',
      'tie', 'laço', 'fivela', 'botão', 'ziper', 'velcro',
      'tacão', 'salto', 'sola', 'palmilha', 'cadarço', 'fivela de sapato'
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
      'minecraft', 'fortnite', 'among us', 'free fire', 'fifa',
      'pokemon', 'mario', 'sonic', 'tetris', 'pac-man', 'space invaders',
      'super mario', 'zelda', 'donkey kong', 'street fighter', 'mortal kombat',
      'call of duty', 'grand theft auto', 'red dead redemption', 'god of war',
      'the last of us', 'spider-man', 'batman arkham', 'assassin\'s creed',
      'final fantasy', 'resident evil', 'silent hill', 'metal gear solid'
    ]
  },
  {
    id: 'cartoons',
    name: 'Desenhos Animados',
    difficulty: 'medium',
    icon: '📺',
    words: [
      'Pica-Pau', 'Tom e Jerry', 'Looney Tunes', 'Pernalonga', 'Patolino',
      'Taz', 'Frajola', 'Papa-Léguas', 'Coyote', 'Road Runner',
      'Scooby-Doo', 'Flintstones', 'Jetsons', 'Os Simpsons', 'Futurama',
      'South Park', 'Family Guy', 'American Dad', 'Bob Esponja', 'Patrick',
      'Lula Molusco', 'Sandy', 'Sr. Siriguejo', 'Plankton', 'Karen',
      'Pink Panther', 'Inspetor', 'Popeye', 'Olive Oyl', 'Brutus',
      'Betty Boop', 'Mickey Mouse', 'Donald Duck', 'Goofy', 'Pluto',
      'Minnie Mouse', 'Pateta', 'Tio Patinhas', 'Huguinho', 'Zezinho', 'Luizinho',
      'Pato Donald', 'Margarida', 'Gastão', 'Peninha', 'Zé Carioca', 'Panchito'
    ]
  },
  {
    id: 'bible',
    name: 'Bíblia',
    difficulty: 'medium',
    icon: '📖',
    words: [
      'Adão', 'Eva', 'Noé', 'Abraão', 'Isaac', 'Jacó', 'José',
      'Moisés', 'Davi', 'Salomão', 'Daniel', 'Jonas', 'Jó',
      'Jesus', 'Maria', 'José', 'João Batista', 'Pedro', 'Paulo',
      'João', 'Mateus', 'Marcos', 'Lucas', 'André', 'Tiago',
      'Tomé', 'Filipe', 'Bartolomeu', 'Mateus', 'Simão', 'Judas',
      'Arca de Noé', 'Torre de Babel', 'Mar Vermelho', 'Monte Sinai',
      'Jardim do Éden', 'Belém', 'Nazaré', 'Jerusalém', 'Canaã',
      'Egito', 'Babilônia', 'Assíria', 'Roma', 'Grécia', 'Israel',
      'Maná', 'Pão da Vida', 'Água da Vida', 'Vinho', 'Pescadores',
      'Pastores', 'Reis Magos', 'Anjos', 'Demônios', 'Serpente'
    ]
  }
];