Mini-Airbnb

Aplicação front-end em Next.js integrada a uma mock API para listagem, filtros, detalhes e simulação de reserva de imóveis, com suporte a i18n, temas e React Query.

Instalação e execução

- Requisitos: Node.js 18+.
- Backend (mock API):
  - `cd mock-api-temporada`
  - `npm install`
  - `npm start` (disponível em `http://localhost:3001`)
- Front-end:
  - `cd mini-airbnb-front-end`
  - `npm install`
  - `npm run dev` (disponível em `http://localhost:3000`)
- Configuração opcional:
  - Defina `NEXT_PUBLIC_API_BASE_URL` para alterar a URL da API (padrão `http://localhost:3001`).

Funcionalidades

- Listagem de imóveis com imagem, título, localização, preço por noite, rating, quantidade de avaliações e disponibilidade.
- Filtros por cidade, estado, tipo de imóvel, faixa de preço, hóspedes, quartos, comodidades e somente disponíveis.
- Página de detalhes com galeria, comodidades, descrição e status de disponibilidade.
- Simulação de reserva com confirmação via modal e integração à rota `/bookings`.
- Feedback de carregamento e erro com componentes AntD e mensagens localizadas.

Decisões técnicas

- Next 15.5 com App Router para rotas dinâmicas por locale e detalhes de imóveis.
- AntD para UI, com ConfigProvider e tokens ajustados ao tema claro/escuro via `next-themes`.
- Tailwind v4 para utilitários de layout e tema (CSS custom properties).
- React Query para cache, revalidação e feedback de estados de rede.
- `next-intl` para i18n com `en` e `pt`, todas as mensagens de UI usam chaves nos locales.
- Axios com um cliente centralizado (`src/lib/api/client.ts`) e transformações de dados no módulo de propriedades.

Melhorias futuras

- Validação de inputs de filtros com formulários controlados e schema.
- Paginação e ordenação na lista.
- Melhor mapeamento i18n de tipos vindos da API para labels.
- Testes com Jest e React Testing Library para componentes críticos e hooks.
- Estados de reserva com datas selecionáveis e cálculo de preço.
