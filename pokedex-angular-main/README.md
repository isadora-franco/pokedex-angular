# Pokédex — Projeto Final Angular

Projeto final de Angular + TypeScript usando a PokéAPI como base de dados.

## Principais alterações feitas

- Novo componente `PokeExplorerPanel`, com painel de navegação, contador de Pokémon visíveis, contador de capturados, filtro por tipo e botão de sorteio.
- Novo componente `PokeEmptyState`, exibido quando a busca/filtro não encontra resultados.
- Cards da listagem redesenhados com número da Pokédex, cor dinâmica por tipo, animação de entrada, hover com movimento no Pokémon e botão de captura.
- Busca melhorada: agora filtra por qualquer parte do nome, não apenas pelo começo.
- Filtro por tipo usando chips dinâmicos gerados a partir dos dados carregados.
- Funcionalidade de “capturar” Pokémon com persistência em `localStorage`.
- Página de detalhes refeita com hero visual, card animado do Pokémon, botão shiny, captura, navegação anterior/próximo, ficha rápida e barras de estatísticas animadas.
- Remoção da dependência externa de fonte do Google Fonts para evitar erro no build de produção offline.

## Como rodar

```bash
npm install
npm start
```

Depois, acesse:

```bash
http://localhost:4200/
```

## Build de produção

```bash
npm run build
```

## Testes

```bash
npm test -- --watch=false
```

## Observação

O projeto usa dados da PokéAPI. Para carregar os Pokémon no navegador, é necessário estar conectado à internet.
