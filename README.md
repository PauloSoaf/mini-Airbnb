# Mini Airbnb - Frontend Application

Uma aplicação frontend desenvolvida com Next.js 15 e React que simula uma plataforma de aluguel por temporada, similar ao Airbnb.

## 🚀 Funcionalidades

### ✅ Implementadas

- **Listagem de Imóveis**
  - Exibição de imóveis com imagem, título, localização, preço, avaliação e disponibilidade
  - Loading states com skeletons
  - Lazy loading de imagens
  - Responsividade total

- **Filtros Funcionais**
  - Filtro por cidade, estado e tipo de imóvel
  - Faixa de preço (mínimo e máximo)
  - Capacidade de hóspedes e quantidade de quartos
  - Comodidades (Wi-Fi, Piscina, Lareira, etc.)
  - Filtro para mostrar apenas imóveis disponíveis
  - Limpar filtros com um clique

- **Página de Detalhes**
  - Galeria de imagens com lazy loading
  - Todas as informações do imóvel
  - Lista de comodidades
  - Informações do anfitrião (nome, super host, desde quando)
  - Loading states apropriados

- **Sistema de Reserva**
  - Modal de simulação de reserva
  - Toasts de sucesso/erro
  - Loading states durante a simulação
  - 20% de chance de erro (conforme API)

- **Internacionalização (i18n)**
  - Suporte para Português (BR) e Inglês (US)
  - Todas as mensagens traduzidas
  - Switch de idioma na navbar

- **Temas (Claro/Escuro)**
  - Suporte completo para tema claro e escuro
  - Switch de tema na navbar
  - Variáveis CSS customizadas

- **Feedback de Usuário**
  - Toasts para ações do usuário
  - Loading states em todas as requisições
  - Mensagens de erro apropriadas
  - Skeletons para carregamento de conteúdo

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Componentes**: Ant Design 5.x
- **Estilos**: Tailwind CSS
- **Estado**: React Query (TanStack Query)
- **Internacionalização**: next-intl
- **Temas**: next-themes
- **HTTP Client**: Axios
- **TypeScript**: Para type safety

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js 18+ ou Bun 1.0+
- NPM ou Bun

### Passos

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd mini-airbnb
   ```

2. **Instale as dependências do frontend**
   ```bash
   cd mini-airbnb-front-end
   npm install
   # ou
   bun install
   ```

3. **Configure a API Mock** (em outro terminal)
   ```bash
   cd mock-api-temporada
   npm install
   npm start
   # ou
   bun install
   bun start
   ```

4. **Execute o frontend**
   ```bash
   cd mini-airbnb-front-end
   npm run dev
   # ou
   bun dev
   ```

5. **Acesse a aplicação**
   - Frontend: http://localhost:3002
   - API Mock: http://localhost:3001

## 🎯 Decisões Técnicas

### Por que Next.js 15 com App Router?
- Melhor performance com Server Components
- Suporte nativo para internacionalização
- Melhor SEO e carregamento de páginas

### Por que Ant Design?
- Componentes robustos e bem testados
- Excelente suporte para temas
- Documentação completa

### Por que React Query?
- Gerenciamento eficiente de estado de servidor
- Cache automático
- Refetching inteligente
- Loading states integrados

### Por que Tailwind CSS?
- Desenvolvimento rápido
- CSS pequeno e otimizado
- Excelente suporte para temas

## 🚀 Melhorias Futuras

Com mais tempo, implementaria:

1. **Performance**
   - Implementar infinite scroll na listagem
   - Adicionar Service Worker para funcionamento offline
   - Otimizar imagens com next/image

2. **Funcionalidades**
   - Sistema de favoritos
   - Comparação de imóveis
   - Mapa interativo com localização dos imóveis
   - Sistema de reviews e avaliações

3. **UX/UI**
   - Animações mais sofisticadas
   - Dark mode automático baseado no sistema
   - Acessibilidade melhorada (WCAG)
   - Mobile-first com touch gestures

4. **Backend**
   - Autenticação de usuários
   - Sistema de favoritos persistente
   - Histórico de buscas
   - Cache distribuído

5. **Testing**
   - Testes unitários com Jest
   - Testes de integração com Cypress
   - Testes de acessibilidade
