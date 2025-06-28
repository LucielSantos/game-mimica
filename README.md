# 🎭 Jogo de Mímica com IA

Um jogo de mímica e desenho com sistema híbrido de geração de palavras usando IA e fallback local.

## ✨ Funcionalidades

- **Sistema Híbrido**: Usa IA quando disponível, fallback local quando não
- **Múltiplas Categorias**: Animais, filmes, profissões, objetos, comidas, ações, lugares, esportes, emoções, tecnologia, música, natureza, veículos, roupas e jogos
- **Diferentes Dificuldades**: Fácil, médio e difícil
- **Timer Configurável**: Tempo personalizável para cada rodada
- **Placar em Tempo Real**: Acompanhe a pontuação de cada equipe
- **Interface Responsiva**: Funciona em desktop e mobile
- **Status da IA**: Visualização do status da IA na interface

## 🚀 Como Usar

### 1. Instalação

```bash
npm install
# ou
yarn install
```

### 2. Configuração da IA (Opcional)

Para usar a IA, crie um arquivo `.env` na raiz do projeto:

```env
VITE_OPENAI_API_KEY=sua_api_key_aqui
```

**Como obter a API Key:**
1. Acesse [OpenAI Platform](https://platform.openai.com/)
2. Faça login ou crie uma conta
3. Vá em "API Keys" → "Create new secret key"
4. Copie a chave (começa com `sk-`)

### 3. Executar o Projeto

```bash
npm run dev
# ou
yarn dev
```

## 🤖 Sistema Híbrido

### Como Funciona

1. **Com IA Configurada**: Gera palavras únicas e criativas usando GPT-3.5
2. **Sem IA**: Usa banco de palavras local expandido (500+ palavras)
3. **Fallback Automático**: Se a IA falhar, automaticamente usa palavras locais
4. **Status Visual**: Interface mostra se está usando IA ou palavras locais

### Status da IA

- 🤖 **IA Ativa**: Usando IA para gerar palavras
- ⏸️ **IA Desabilitada**: IA configurada mas desabilitada
- ⚠️ **IA Indisponível**: IA configurada mas com erro
- ❌ **IA Não Configurada**: Usando apenas palavras locais

## 💰 Custos da IA

- **Período Gratuito**: $5 de crédito para novos usuários (3 meses)
- **Após créditos**: ~$0.002 por 1K tokens (muito barato)
- **Exemplo**: 1 hora de jogo = menos de $0.06

## 🎮 Como Jogar

1. **Configurar Jogo**:
   - Adicione equipes
   - Selecione categorias
   - Configure o timer

2. **Durante o Jogo**:
   - Um jogador vê a palavra
   - Faz mímica ou desenha
   - Equipe tenta adivinhar
   - Use "Acertou!" ou "Nova Palavra"

3. **Pontuação**:
   - +1 ponto por acerto
   - Próxima vez automaticamente

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Estilização**: Tailwind CSS
- **IA**: OpenAI GPT-3.5-turbo
- **Ícones**: Lucide React
- **Roteamento**: React Router

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── AIStatus.tsx    # Status da IA
│   ├── GamePlay.tsx    # Interface do jogo
│   └── ...
├── services/
│   └── aiService.ts    # Serviço de IA híbrido
├── hooks/
│   └── useGame.ts      # Lógica do jogo
├── data/
│   └── categories.ts   # Categorias e palavras locais
└── types/
    └── game.ts         # Tipos TypeScript
```

## 🔧 Configurações Avançadas

### Personalizar IA

```typescript
import { aiService } from './services/aiService';

// Configurar IA
aiService.setConfig({
  model: 'gpt-4',           // Modelo mais avançado
  temperature: 0.9,         // Mais criativo
  maxTokens: 100,           // Respostas mais longas
});

// Forçar apenas palavras locais
aiService.toggleAI(false);

// Verificar status
const status = aiService.getAIStatus();
```

### Adicionar Novas Categorias

```typescript
// Em src/data/categories.ts
{
  id: 'nova-categoria',
  name: 'Nova Categoria',
  difficulty: 'medium',
  icon: '🎯',
  words: ['palavra1', 'palavra2', 'palavra3']
}
```

## 🐛 Solução de Problemas

### IA não funciona
1. Verifique se a API key está correta
2. Confirme se tem créditos na OpenAI
3. Verifique a conexão com internet
4. O jogo continuará funcionando com palavras locais

### Palavras repetidas
- Com IA: Palavras são geradas dinamicamente
- Sem IA: Banco local com 500+ palavras (pouca repetição)

## 📄 Licença

MIT License - Use livremente para projetos pessoais e comerciais.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Adicionar novas categorias
- Melhorar a interface

---

**Divirta-se jogando! 🎉** 