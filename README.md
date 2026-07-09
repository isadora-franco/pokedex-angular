# Pokédex

Projeto final da capacitação de Angular, construído em cima da [PokéAPI](https://pokeapi.co/).

A ideia inicial do projeto era bem simples: uma lista de Pokémon e uma tela de detalhes com as estatísticas. A partir dessa base, evoluí bastante o projeto, tanto em funcionalidades quanto em design, e também integrei um fluxo de login usando uma simulação de backend de autenticação feito em Node.

## O que dá pra fazer

- Buscar Pokémon pelo nome (a busca considera qualquer parte do nome, não só o começo)
- Filtrar por tipo, com os filtros sendo gerados automaticamente a partir dos dados da API
- Sortear um Pokémon aleatório da lista filtrada
- Capturar Pokémon direto pelo card da listagem — a captura fica salva no navegador (localStorage), então não some ao atualizar a página
- Ver os detalhes de cada Pokémon: estatísticas, habilidades, altura, peso, descrição da Pokédex e a versão shiny
- Navegar entre Pokémon (anterior/próximo) direto na tela de detalhes, sem voltar pra lista
- Fazer login (usando o backend fake incluso no repositório)

## Tecnologias usadas

- Angular 21 + TypeScript
- RxJS
- SCSS
- PokéAPI
- Node/Express (backend fake de autenticação, com JWT)

## Como rodar o projeto

O login depende do backend fake, então o ideal é rodar os dois ao mesmo tempo (em terminais separados).

**1. Backend de autenticação**

```bash
cd curso-de-angular-fake-jwt-master
npm install
npm start
```

Sobe em `http://localhost:3000`.

**2. Aplicação Angular**

```bash
cd pokedex-angular-main
npm install
npm start
```

Depois é só acessar `http://localhost:4200` no navegador.

> Login de teste: `ashTreinador@gmail.com` / `1234`

## Observação

A listagem carrega os dados direto da PokéAPI, então é necessário estar conectado à internet para os Pokémon aparecerem.

---