# 📖 Pokédex Interativa

Este projeto é uma **Pokédex online** que consome dados da [PokeAPI](https://pokeapi.co/).  
Ele mostra os Pokémons em cards, permite buscar por **nome, ID ou tipo (em português ou inglês)** e tem **paginação dinâmica**.

---

## ⚡ Funcionalidades
- Exibe **18 Pokémons por página**.
- Mostra **ID, imagem, nome e tipo** (com tradução para português).
- **Paginação deslizante** com destaque na página atual.
- Busca inteligente:
  - Por **nome** → ex: `charmander`
  - Por **ID** → ex: `#25`
  - Por **tipo** → ex: `fogo`, `água`, `fire`, `water`
- Evita duplicados nos resultados.
- Se não encontrar nada → mostra mensagem: *Nenhum Pokémon encontrado.*

---

## 🛠️ Estrutura do Código

### 🔹 Seletores principais
Pega os elementos do HTML para manipular a Pokédex, barra de busca, paginação e botões.

### 🔹 Variáveis de controle
Guarda a página atual, total de páginas, limite de Pokémons por página e a lista completa da API.

### 🔹 Tradução dos tipos
Converte os tipos da API (em inglês) para português.  
Exemplo: `fire → Fogo`.

### 🔹 Carregamento inicial
`loadAllPokemon()` → busca todos os Pokémons da API, calcula o total de páginas e mostra a primeira.

### 🔹 Paginação
- `loadPage(page)` → mostra os Pokémons de uma página específica.  
- `renderPagination()` → cria os botões **Anterior / Próximo** e até 3 números de página.

### 🔹 Exibição dos Pokémons
`displayPokemon()` → monta os cards com nome, tipo traduzido, imagem e ID.

### 🔹 Busca
`buscarPokemon(query)` → faz a busca por nome, ID ou tipo (pt/en).  
- Aplica paginação nos resultados.  
- Evita resultados duplicados.

### 🔹 Paginação da busca
`renderPaginationBusca()` → controla a paginação quando os resultados vêm de uma pesquisa.

### 🔹 Eventos
- Ao **digitar** na barra de busca → pesquisa automaticamente.  
- Ao **clicar no botão Buscar** → pesquisa manualmente.  
- Se a barra estiver vazia → volta para a lista completa.

### 🔹 Inicialização
`loadAllPokemon()` é chamado no final do código para carregar a Pokédex logo que a página abre.

---

## 📊 Fluxo Resumido

1. Página abre → `loadAllPokemon()` carrega todos os Pokémons.  
2. Usuário vê **18 cards por página** com paginação.  
3. Usuário pode:  
   - Usar paginação → troca a página.  
   - Digitar na busca → pesquisa por nome, ID ou tipo.  
4. Pokémons aparecem com **cards estilizados** e paginação adaptada.  
5. Se não encontrar → mostra mensagem de erro.

---

## 🔗 Fonte de Dados
[PokeAPI v2](https://pokeapi.co/)

---

## 💡 Exemplo de Busca
- `pikachu` → busca por nome.  
- `#150` → busca pelo ID (Mewtwo).  
- `fogo` → busca por tipo em português.  
- `fire` → busca por tipo em inglês.

---

👨‍💻 Desenvolvido por **Allan Andrade de Jesus**
# desafio-tecnico-Lumis
