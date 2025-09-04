// Seletores principais
const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('search');
const paginationDiv = document.querySelector('.pagination');
const searchBtn = document.getElementById('search-btn');

// Variáveis de controle
let currentPage = 1;
const limit = 18;
let totalPages = 0;
let allPokemonList = [];

// Tradução dos tipos para PT-BR
const tipoPT = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  grass: 'Planta',
  electric: 'Elétrico',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terrestre',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Noturno',
  steel: 'Aço',
  fairy: 'Fada'
};

// Mapeamento para busca por tipo em português
const ptParaEng = {};
for (let key in tipoPT) ptParaEng[tipoPT[key].toLowerCase()] = key;

// Carrega todos os Pokémon para busca e paginação
async function loadAllPokemon() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const data = await res.json();
  allPokemonList = data.results;
  totalPages = Math.ceil(allPokemonList.length / limit);
  loadPage(currentPage);
}

// Carrega uma página específica da lista completa
async function loadPage(page) {
  currentPage = page;
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageList = allPokemonList.slice(start, end);

  const pokemonDetails = await Promise.all(
    pageList.map(async p => {
      const res = await fetch(p.url);
      return res.json();
    })
  );

  displayPokemon(pokemonDetails);
  renderPagination();
}

// Exibe os cards dos Pokémon
function displayPokemon(pokemonArray) {
  pokedex.innerHTML = '';
  pokemonArray.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    const tipoPrincipal = tipoPT[pokemon.types[0].type.name];

    card.innerHTML = `
      <div class="card-row card-row-top">
        <span class="card-type">${tipoPrincipal}</span>
        <span class="card-id">#${pokemon.id}</span>
      </div>
      <div class="card-row card-row-img">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </div>
      <div class="card-row card-row-name">
        <span>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</span>
      </div>
    `;
    pokedex.appendChild(card);
  });
}

// Renderiza a paginação padrão (listagem completa)
function renderPagination() {
  paginationDiv.innerHTML = '';

  // Botão Anterior
  const prev = document.createElement('button');
  prev.innerHTML = `<img src="img/Arrowleft.png" alt="Anterior">Anterior`;
  if (currentPage === 1) prev.classList.add('disabled');
  else prev.addEventListener('click', () => loadPage(currentPage - 1));
  paginationDiv.appendChild(prev);

  // Paginação deslizante (máximo 3 números visíveis)
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);
  if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) pageBtn.classList.add('active');
    else pageBtn.addEventListener('click', () => loadPage(i));
    paginationDiv.appendChild(pageBtn);
  }

  // Botão Próximo
  const next = document.createElement('button');
  next.innerHTML = `Próximo<img src="img/ArrowRight.png" alt="Proximo">`;
  if (currentPage === totalPages) next.classList.add('disabled');
  else next.addEventListener('click', () => loadPage(currentPage + 1));
  paginationDiv.appendChild(next);
}

// Busca Pokémon por nome, tipo ou ID (#)
async function buscarPokemon(query, page = 1) {
  let resultados = [];

  // Se o filtro for apenas "#", mostra todos os Pokémon normalmente
  if (query === '#') {
    totalPages = Math.ceil(allPokemonList.length / limit);
    loadPage(1);
    return;
  }

  // Busca por ID usando #
  if (query.startsWith('#')) {
    const id = query.slice(1);
    if (!isNaN(id) && id) {
      const poke = allPokemonList.find(p => p.url.split('/').slice(-2, -1)[0] === id);
      if (poke) resultados.push(await fetch(poke.url).then(res => res.json()));
    }
  } else {
    // Busca por nome (case insensitive)
    const nomeFiltrado = allPokemonList.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    const detalhesNome = await Promise.all(nomeFiltrado.map(p => fetch(p.url).then(res => res.json())));
    resultados.push(...detalhesNome);

    // Busca por tipo (pt/en)
    const tipoQuery = ptParaEng[query] || query;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoQuery}`);
      if (res.ok) {
        const data = await res.json();
        const detalhesTipo = await Promise.all(
          data.pokemon.map(p => fetch(p.pokemon.url).then(res => res.json()))
        );
        resultados.push(...detalhesTipo);
      }
    } catch {}
  }

  // Remove duplicados
  const unicos = resultados.filter((v, i, a) => a.findIndex(p => p.id === v.id) === i);

  // Paginação dos resultados filtrados
  totalPages = Math.ceil(unicos.length / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const pagina = unicos.slice(start, end);

  // Exibe resultados
  if (unicos.length === 0) {
    pokedex.innerHTML = '<p>Nenhum Pokémon encontrado.</p>';
    paginationDiv.innerHTML = '';
  } else {
    displayPokemon(pagina);
    renderPaginationBusca(unicos, page);
  }
}

// Paginação para resultados de busca
function renderPaginationBusca(lista, page) {
  paginationDiv.innerHTML = '';

  const pages = Math.ceil(lista.length / limit);

  // Botão anterior
  const prev = document.createElement('button');
  prev.textContent = 'Anterior';
  if (page === 1) prev.classList.add('disabled');
  else prev.onclick = () => buscarPokemon(searchInput.value.trim().toLowerCase(), page - 1);
  paginationDiv.appendChild(prev);

  // Paginação deslizante (máximo 3 números visíveis)
  let startPage = Math.max(1, page - 1);
  let endPage = Math.min(pages, startPage + 2);
  if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === page) btn.classList.add('active');
    else btn.onclick = () => buscarPokemon(searchInput.value.trim().toLowerCase(), i);
    paginationDiv.appendChild(btn);
  }

  // Botão próximo
  const next = document.createElement('button');
  next.textContent = 'Próximo';
  if (page === pages) next.classList.add('disabled');
  else next.onclick = () => buscarPokemon(searchInput.value.trim().toLowerCase(), page + 1);
  paginationDiv.appendChild(next);
}

// Botão voltar ao topo para mobile
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Eventos de busca (input e botão)
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    totalPages = Math.ceil(allPokemonList.length / limit);
    loadPage(1);
  } else {
    buscarPokemon(query, 1);
  }
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    totalPages = Math.ceil(allPokemonList.length / limit);
    loadPage(1);
  } else {
    buscarPokemon(query, 1);
  }
});

loadAllPokemon();
