/**
 * @typedef {Object} Transaction
 * @property {string|number} transaction_id Уникальный идентификатор транзакции.
 * @property {string} transaction_date Дата транзакции в формате YYYY-MM-DD.
 * @property {number} transaction_amount Сумма транзакции.
 * @property {string} transaction_type Тип транзакции: "debit" или "credit".
 * @property {string} transaction_description Описание транзакции.
 * @property {string} merchant_name Магазин или сервис.
 * @property {string} card_type Тип карты: "debit" или "credit".
 */

/**
 * Пример массива транзакций для тестирования всех функций.
 * Он включает разные месяцы, типы и суммы.
 * @type {Transaction[]}
 */
const transactions = [
  {
    transaction_id: "T1",
    transaction_date: "2024-03-01",
    transaction_amount: 125.5,
    transaction_type: "debit",
    transaction_description: "Продукты в супермаркете",
    merchant_name: "Market Plus",
    card_type: "debit",
  },
  {
    transaction_id: "T2",
    transaction_date: "2024-03-02",
    transaction_amount: 2000,
    transaction_type: "credit",
    transaction_description: "Зарплата",
    merchant_name: "Employer Inc",
    card_type: "credit",
  },
  {
    transaction_id: "T3",
    transaction_date: "2024-03-05",
    transaction_amount: 45,
    transaction_type: "debit",
    transaction_description: "Поездка на такси",
    merchant_name: "FastTaxi",
    card_type: "debit",
  },
  {
    transaction_id: "T4",
    transaction_date: "2024-04-10",
    transaction_amount: 150.75,
    transaction_type: "credit",
    transaction_description: "Возврат по заказу",
    merchant_name: "Online Shop",
    card_type: "credit",
  },
  {
    transaction_id: "T5",
    transaction_date: "2024-04-20",
    transaction_amount: 320,
    transaction_type: "debit",
    transaction_description: "Покупка электроники",
    merchant_name: "ElectroWorld",
    card_type: "debit",
  },
  {
    transaction_id: "T6",
    transaction_date: "2024-04-20",
    transaction_amount: 75.25,
    transaction_type: "debit",
    transaction_description: "Кофе и закуски",
    merchant_name: "Coffee House",
    card_type: "debit",
  },
  {
    transaction_id: "T7",
    transaction_date: "2024-05-02",
    transaction_amount: 220,
    transaction_type: "credit",
    transaction_description: "Кэшбэк по карте",
    merchant_name: "Bank Rewards",
    card_type: "credit",
  },
];
//переобразование даты в оьект Date
/**
 * Преобразует строку даты в объект Date.
 * @param {string} dateString Дата в формате YYYY-MM-DD.
 * @returns {Date} Объект Date.
 */
function parseTransactionDate(dateString) {
  return new Date(dateString + "T00:00:00");
}
//уникальные типы транзакций
/*
 * Возвращает массив уникальных типов транзакций.
 * @param {Transaction[]} transactions
 * @returns {string[]} Уникальные значения transaction_type.
 */
function getUniqueTransactionTypes(transactions) {
  return Array.from(new Set(transactions.map((t) => t.transaction_type.toLowerCase())));
}

/**
 * Вычисляет сумму всех транзакций.
 * @param {Transaction[]} transactions
 * @returns {number} Сумма всех transaction_amount.
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Вычисляет сумму транзакций по заданной дате, месяцу и/или году.
 * Если параметр не указан, он не учитывается в фильтрации.
 * @param {Transaction[]} transactions
 * @param {number} [year]
 * @param {number} [month] Месяц 1-12.
 * @param {number} [day]
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter((transaction) => {
      const date = parseTransactionDate(transaction.transaction_date);
      if (year != null && date.getFullYear() !== Number(year)) return false;
      if (month != null && date.getMonth() + 1 !== Number(month)) return false;
      if (day != null && date.getDate() !== Number(day)) return false;
      return true;
    })
    .reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Transaction[]} transactions
 * @param {string} type
 * @returns {Transaction[]}
 */
function getTransactionByType(transactions, type) {
  const typeLower = type.toLowerCase();
  return transactions.filter((transaction) => transaction.transaction_type.toLowerCase() === typeLower);
}

/**
 * Возвращает транзакции в указанном диапазоне дат включительно.
 * @param {Transaction[]} transactions
 * @param {string} startDate Дата начала в формате YYYY-MM-DD.
 * @param {string} endDate Дата конца в формате YYYY-MM-DD.
 * @returns {Transaction[]}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = parseTransactionDate(startDate);
  const end = parseTransactionDate(endDate);
  return transactions.filter((transaction) => {
    const date = parseTransactionDate(transaction.transaction_date);
    return date >= start && date <= end;
  });
}

/**
 * Возвращает транзакции по названию магазина/сервиса.
 * @param {Transaction[]} transactions
 * @param {string} merchantName
 * @returns {Transaction[]}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  const nameLower = merchantName.toLowerCase();
  return transactions.filter((transaction) => transaction.merchant_name.toLowerCase() === nameLower);
}

/**
 * Вычисляет среднюю сумму транзакции.
 * @param {Transaction[]} transactions
 * @returns {number} Среднее значение или 0 для пустого массива.
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Возвращает транзакции с суммой в заданном диапазоне.
 * @param {Transaction[]} transactions
 * @param {number} minAmount
 * @param {number} maxAmount
 * @returns {Transaction[]}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (transaction) => transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount
  );
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Transaction[]} transactions
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  return getTransactionByType(transactions, "debit").reduce((sum, transaction) => sum + transaction.transaction_amount, 0);
}

/**
 * Преобразует номер месяца в название.
 * @param {number} monthIndex 0-11.
 * @returns {string}
 */
function getMonthName(monthIndex) {
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return monthNames[monthIndex] || "Неизвестный месяц";
}

/**
 * Находит месяц с наибольшим количеством транзакций.
 * @param {Transaction[]} transactions
 * @returns {string} Название месяца.
 */
function findMostTransactionsMonth(transactions) {
  const counts = transactions.reduce((acc, transaction) => {
    const month = parseTransactionDate(transaction.transaction_date).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  let maxMonth = null;
  let maxCount = 0;
  for (const monthIndex in counts) {
    if (counts[monthIndex] > maxCount) {
      maxCount = counts[monthIndex];
      maxMonth = Number(monthIndex);
    }
  }

  return maxMonth === null ? "Нет данных" : getMonthName(maxMonth);
}

/**
 * Находит месяц с наибольшим количеством дебетовых транзакций.
 * @param {Transaction[]} transactions
 * @returns {string}
 */
function findMostDebitTransactionMonth(transactions) {
  const debitTransactions = getTransactionByType(transactions, "debit");
  const counts = debitTransactions.reduce((acc, transaction) => {
    const month = parseTransactionDate(transaction.transaction_date).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  let maxMonth = null;
  let maxCount = 0;
  for (const monthIndex in counts) {
    if (counts[monthIndex] > maxCount) {
      maxCount = counts[monthIndex];
      maxMonth = Number(monthIndex);
    }
  }

  return maxMonth === null ? "Нет данных" : getMonthName(maxMonth);
}

/**
 * Определяет, какого типа транзакций больше.
 * @param {Transaction[]} transactions
 * @returns {string} "debit", "credit" или "equal".
 */
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;

  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

/**
 * Возвращает транзакции до указанной даты (исключая саму дату).
 * @param {Transaction[]} transactions
 * @param {string} date Дата в формате YYYY-MM-DD.
 * @returns {Transaction[]}
 */
function getTransactionsBeforeDate(transactions, date) {
  const limit = parseTransactionDate(date);
  return transactions.filter((transaction) => parseTransactionDate(transaction.transaction_date) < limit);
}

/**
 * Находит транзакцию по ее уникальному идентификатору.
 * @param {Transaction[]} transactions
 * @param {string|number} id
 * @returns {Transaction|undefined}
 */
function findTransactionById(transactions, id) {
  return transactions.find((transaction) => transaction.transaction_id === id);
}

/**
 * Возвращает массив только описаний транзакций.
 * @param {Transaction[]} transactions
 * @returns {string[]}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map((transaction) => transaction.transaction_description);
}

// Тестовые данные для дополнительных проверок
const emptyTransactions = [];
const singleTransaction = [transactions[0]];

console.log("--- Результаты анализа транзакций ---");
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Сумма всех транзакций:", calculateTotalAmount(transactions));
console.log("Сумма всех транзакций 2024 года:", calculateTotalAmountByDate(transactions, 2024));
console.log("Сумма всех транзакций за апрель 2024:", calculateTotalAmountByDate(transactions, 2024, 4));
console.log(
  "Сумма транзакций 20 апреля 2024:",
  calculateTotalAmountByDate(transactions, 2024, 4, 20)
);
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции с 2024-03-01 по 2024-04-01:", getTransactionsInDateRange(transactions, "2024-03-01", "2024-04-01"));
console.log("Транзакции магазина ElectroWorld:", getTransactionsByMerchant(transactions, "ElectroWorld"));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции от 50 до 200:", getTransactionsByAmountRange(transactions, 50, 200));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим числом транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Каких транзакций больше:", mostTransactionTypes(transactions));
console.log("Транзакции до 2024-04-01:", getTransactionsBeforeDate(transactions, "2024-04-01"));
console.log("Поиск транзакции по id T4:", findTransactionById(transactions, "T4"));
console.log("Список описаний транзакций:", mapTransactionDescriptions(transactions));

console.log("--- Проверка на пустом массиве ---");
console.log("Сумма пустого массива:", calculateTotalAmount(emptyTransactions));
console.log("Средняя пустого массива:", calculateAverageTransactionAmount(emptyTransactions));
console.log("Транзакции по типу на пустом массиве:", getTransactionByType(emptyTransactions, "debit"));

console.log("--- Проверка на одном элементе ---");
console.log("Уникальные типы:", getUniqueTransactionTypes(singleTransaction));
console.log("Сумма одного элемента:", calculateTotalAmount(singleTransaction));
console.log("Средняя одного элемента:", calculateAverageTransactionAmount(singleTransaction));
console.log("Поиск по id одного элемента:", findTransactionById(singleTransaction, "T1"));
