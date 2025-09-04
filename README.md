# 📖 Pokédex Interativa

Este projeto é uma **Pokédex online** que consome dados da [PokeAPI](https://pokeapi.co/).  
Ele mostra os Pokémons em cards, permite buscar por **nome, ID ou tipo (em português ou inglês)**, tem **paginação dinâmica** e um **botão de voltar ao topo para mobile**.

---

## ⚡ Funcionalidades
- Exibe **18 Pokémons por página**.
- Mostra **ID, imagem, nome e tipo** (com tradução para português).
- **Paginação deslizante** com até 3 páginas visíveis e destaque na página atual.
- Busca inteligente:
  - Por **nome** → ex: `charmander`
  - Por **ID** → ex: `#25`
  - Por **tipo** → ex: `fogo`, `água`, `fire`, `water`
- Evita duplicados nos resultados.
- Se não encontrar nada → mostra mensagem: *Nenhum Pokémon encontrado.*
- **Botão "Voltar ao topo"** aparece automaticamente em telas menores (mobile) ao rolar a página.

---

## 🛠️ Estrutura do Código

### 🔹 Seletores principais
Identifica os elementos principais do HTML (Pokedéx, barra de busca, paginação, botões).

### 🔹 Variáveis de controle
Guarda informações de página atual, limite de Pokémons por página e lista completa da API.

### 🔹 Tradução dos tipos
Converte os tipos da API (em inglês) para português.  
Exemplo: `fire → Fogo`.

### 🔹 Carregamento inicial
`loadAllPokemon()` → busca todos os Pokémons, calcula páginas e carrega a primeira.

### 🔹 Paginação
- `loadPage(page)` → carrega os Pokémons de uma página.  
- `renderPagination()` → cria botões **Anterior / Próximo** e até 3 páginas ao mesmo tempo.

### 🔹 Exibição dos Pokémons
`displayPokemon()` → cria os **cards com nome, tipo, ID e imagem**.

### 🔹 Busca avançada
`buscarPokemon(query)` → pesquisa por nome, ID ou tipo (pt/en).  
- Aplica paginação própria nos resultados.  
- Remove duplicados.  
- Mostra mensagem se não encontrar nada.

### 🔹 Paginação da busca
`renderPaginationBusca()` → controla a navegação entre páginas **quando há resultados filtrados**.

### 🔹 Botão "Voltar ao topo"
- Só aparece em **dispositivos móveis (até 768px)**.  
- Fica visível se o usuário rolar mais de **200px**.  
- Ao clicar, rola suavemente até o topo.

### 🔹 Eventos
- Ao **digitar** → pesquisa em tempo real.  
- Ao **clicar em Buscar** → pesquisa manual.  
- Se a barra estiver vazia → volta para listagem completa.  
- Scroll no mobile → ativa/desativa o botão "Voltar ao topo".

### 🔹 Inicialização
`loadAllPokemon()` → inicia a aplicação carregando a Pokédex completa.

---

## 📊 Fluxo Resumido

1. Página abre → carrega todos os Pokémons.  
2. Usuário vê **18 cards por página** com paginação.  
3. Pode navegar:  
   - Paginação → troca página.  
   - Busca → por nome, tipo ou ID.  
4. Se estiver no mobile → botão "Voltar ao topo" aparece ao rolar.  
5. Cards mostram **detalhes em português**.

---

## 🔗 Fonte de Dados
[PokeAPI v2](https://pokeapi.co/)

---

## 💡 Exemplos de Busca
- `pikachu` → busca por nome.  
- `#150` → busca por ID (Mewtwo).  
- `fogo` → busca por tipo em português.  
- `fire` → busca por tipo em inglês.  

---

👨‍💻 Desenvolvido por **Allan Andrade de Jesus**
# desafio-tecnico-Lumis
