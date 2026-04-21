const BASE_URL = 'https://api.coingecko.com/api/v3';

async function fetchCoins(currency = 'usd', perPage = 10) {
  const url = BASE_URL + '/coins/markets?vs_currency=' + currency + '&order=market_cap_desc&per_page=' + perPage + '&page=1&price_change_percentage=24h';
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
}

const FAVORITES_KEY = 'cryptoboard_favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function isFavorite(coinId) {
  return getFavorites().includes(coinId);
}

function toggleFavorite(coinId) {
  const favs = getFavorites();
  const index = favs.indexOf(coinId);
  if (index === -1) {
    favs.push(coinId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return true;
  } else {
    favs.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return false;
  }
}

const CURRENCY_SYMBOLS = { usd: '$', eur: '€', rub: '₽' };

function formatPrice(value, currency = 'usd') {
  const sym = CURRENCY_SYMBOLS[currency] || '$';
  if (value === null || value === undefined) return '—';
  if (value >= 1000) {
    return sym + value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (value >= 1) {
    return sym + value.toFixed(4);
  }
  return sym + value.toFixed(8);
}

function formatChange(value) {
  if (value === null || value === undefined) return '—';
  const sign = value >= 0 ? '+' : '';
  return sign + value.toFixed(2) + '%';
}

function renderCoins(coins, currency, onCardClick) {
  const grid = document.getElementById('grid');
  const emptyState = document.getElementById('emptyState');

  if (coins.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = coins.map((coin) => {
    const isUp = (coin.price_change_percentage_24h || 0) >= 0;
    const favActive = isFavorite(coin.id) ? 'active' : '';
    const favoritedClass = isFavorite(coin.id) ? 'favorited' : '';
    const changeClass = isUp ? 'up' : 'down';
    return `
      <div class="coin-card ${favoritedClass}"
           data-id="${coin.id}"
           role="button"
           tabindex="0">
        <div class="card-header">
          <span class="card-rank">#${coin.market_cap_rank}</span>
          <img class="card-img" src="${coin.image}" alt="${coin.name}" />
          <div class="card-name-wrap">
            <span class="card-name">${coin.name}</span>
            <span class="card-symbol">${coin.symbol.toUpperCase()}</span>
          </div>
          <button class="card-fav ${favActive}"
                  data-favid="${coin.id}"
                  title="Favorite">★</button>
        </div>
        <div class="card-price">${formatPrice(coin.current_price, currency)}</div>
        <div class="card-change ${changeClass}">${formatChange(coin.price_change_percentage_24h)}</div>
      </div>
    `;
  }).join('');

  coins.forEach(coin => {
    const card = grid.querySelector(`[data-id="${coin.id}"]`);
    if (!card) return;

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-fav')) return;
      onCardClick(coin);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onCardClick(coin);
      }
    });

    const favBtn = card.querySelector('.card-fav');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const added = toggleFavorite(coin.id);
      favBtn.classList.toggle('active', added);
      card.classList.toggle('favorited', added);
    });
  });
}

function openModal(coin, currency) {
  const modal = document.getElementById('modal');
  const isUp = (coin.price_change_percentage_24h || 0) >= 0;

  document.getElementById('modalImg').src = coin.image;
  document.getElementById('modalImg').alt = coin.name;
  document.getElementById('modalTitle').textContent = coin.name;
  document.getElementById('modalSymbol').textContent = coin.symbol.toUpperCase();
  document.getElementById('modalPrice').textContent = formatPrice(coin.current_price, currency);

  const changeEl = document.getElementById('modalChange');
  changeEl.textContent = formatChange(coin.price_change_percentage_24h);
  changeEl.style.color = isUp ? '#22c55e' : '#ef4444';

  const favBtn = document.getElementById('modalFavBtn');
  favBtn.textContent = isFavorite(coin.id) ? '★' : '☆';
  favBtn.onclick = () => {
    const added = toggleFavorite(coin.id);
    favBtn.textContent = added ? '★' : '☆';
  };

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

let coins = [];
let filtered = [];
let currency = 'usd';
let search = '';
let sort = 'market_cap_desc';
let showFavOnly = false;

async function loadData() {
  try {
    coins = await fetchCoins(currency, 10);
    applyFilters();
    document.getElementById('errorBanner').classList.add('hidden');
  } catch (err) {
    console.log('Error loading:', err);
    document.getElementById('errorBanner').classList.remove('hidden');
  }
}

function applyFilters() {
  let result = [...coins];

  if (showFavOnly) {
    const favs = getFavorites();
    result = result.filter(c => favs.includes(c.id));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
  }

  if (sort === 'price_desc') {
    result.sort((a, b) => b.current_price - a.current_price);
  }

  filtered = result;
  renderCoins(filtered, currency, handleCardClick);
}

function handleCardClick(coin) {
  openModal(coin, currency);
}

function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', (e) => {
    search = e.target.value.trim();
    applyFilters();
  });

  document.getElementById('currencySelect').addEventListener('change', (e) => {
    currency = e.target.value;
    loadData();
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    sort = e.target.value;
    applyFilters();
  });

  document.getElementById('favBtn').addEventListener('click', () => {
    showFavOnly = !showFavOnly;
    document.getElementById('favBtn').classList.toggle('active', showFavOnly);
    applyFilters();
  });

  document.getElementById('refreshBtn').addEventListener('click', () => {
    loadData();
  });

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.retry = loadData;

loadData();
setupEventListeners();