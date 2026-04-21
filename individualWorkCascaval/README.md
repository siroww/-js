# CryptoBoard 🪙

Криптовалютный дашборд на чистом JavaScript — отслеживание цен, графиков и трендов в реальном времени.

## Автор

Студент, дисциплина «JavaScript»

## Описание

CryptoBoard — веб-приложение для мониторинга рынка криптовалют. Данные загружаются с публичного API CoinGecko без ключа. Приложение обновляется автоматически каждые 60 секунд.

### Основные функции

- Отображение топ-50 монет по рыночной капитализации
- Поиск монет по названию или тикеру (с валидацией ввода)
- Сортировка по капитализации, цене (↑/↓) и изменению за 24ч
- Фильтр «Только избранные» — список сохраняется в localStorage
- Бегущая строка с актуальными ценами
- Мини-графики (sparkline) в карточке за 7 дней
- Модальное окно с детальным графиком за 24ч / 7д / 30д / 90д
- Смена валюты: USD, EUR, RUB
- Адаптивная верстка (мобильные устройства)

## Технологии

- **JavaScript** (ES6+, модули)
- **HTML5 / CSS3** (CSS-переменные, Grid, анимации)
- **Chart.js** — графики (подключается через CDN)
- **CoinGecko API** — бесплатный публичный API

## Структура проекта

```
crypto-dashboard/
├── index.html       # Разметка приложения
├── style.css        # Стили (темная тема, адаптив)
├── README.md
└── js/
    ├── app.js       # Главный модуль, точка входа
    ├── api.js       # Запросы к CoinGecko API
    ├── ui.js        # Рендеринг интерфейса
    ├── chart.js     # Отрисовка графиков
    ├── storage.js   # Работа с localStorage (избранное)
    └── utils.js     # Форматирование, валидация
```

## Запуск проекта

### Способ 1 — Live Server (рекомендуется)

Приложение использует ES-модули (`type="module"`), поэтому нужен локальный сервер:

1. Установите расширение **Live Server** в VS Code
2. Откройте папку проекта в VS Code
3. Нажмите правой кнопкой на `index.html` → **Open with Live Server**
4. Приложение откроется на `http://localhost:5500`

### Способ 2 — через npx

```bash
npx serve .
```

Затем откройте `http://localhost:3000`

### Способ 3 — Python

```bash
python -m http.server 8000
```

Затем откройте `http://localhost:8000`

> ⚠️ **Важно:** Открытие через `file://` не работает из-за CORS-ограничений ES-модулей и API-запросов.

## Примеры использования

**Поиск монеты:**  
Введите `btc` или `bitcoin` в поле поиска — список фильтруется с задержкой 300мс.

**Добавить в избранное:**  
Нажмите ★ на карточке. Монета сохраняется в localStorage. Кнопка «★ Избранные» показывает только их.

**Детальный график:**  
Кликните на карточку → откроется модалка с графиком. Вкладки 24ч / 7д / 30д / 90д.

**Сменить валюту:**  
Выберите USD / EUR / RUB в выпадающем списке — все цены пересчитаются.

## API

Используется [CoinGecko API v3](https://www.coingecko.com/en/api/documentation) — бесплатный, без регистрации.

Основные эндпоинты:
- `GET /coins/markets` — список монет с ценами и sparkline
- `GET /coins/{id}/market_chart` — история цены для графика

Лимит: ~30 запросов/минуту на бесплатном плане.

## Источники

- [CoinGecko API Documentation](https://www.coingecko.com/en/api/documentation)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [MDN Web Docs — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs — ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN Web Docs — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
