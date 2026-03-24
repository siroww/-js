// ЗАДАНИЕ 7 (дополнительно): Функция reduce(array, callback, initialValue)
// Накапливает результат в аккумуляторе, проходя по всем элементам

function reduce(array, callback, initialValue) {
    let accumulator;
    let startIndex = 0;
    
    if (arguments.length < 3) {
        if (array.length === 0) {
            return undefined;
        }
        accumulator = array[0];
        startIndex = 1;
    } else {
        accumulator = initialValue;
    }
    
    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array); // acc, элемент, индекс, массив
    }
    
    return accumulator;
}

const numbers = [1, 2, 3, 4, 5];

console.log("--- (7.1) Сумма со стартовым 0 ---");
const sum = reduce(numbers, (acc, el) => acc + el, 0);
console.log("Array:", numbers);
console.log("Sum:", sum); // 15

console.log("\n--- (7.2) Произведение ---");
const product = reduce(numbers, (acc, el) => acc * el, 1);
console.log("Product:", product); // 120

console.log("\n--- (7.3) Конкатенация строк ---");
const words = ['Hello', ' ', 'world', '!'];
const sentence = reduce(words, (acc, word) => acc + word, '');
console.log("Sentence:", sentence); // 'Hello world!'

console.log("\n--- (7.4) Объект из пар ---");
const pairs = [['a', 1], ['b', 2], ['c', 3]];
const obj = reduce(pairs, (acc, pair) => {
    acc[pair[0]] = pair[1];
    return acc;
}, {});
console.log("Object:", obj); // { a: 1, b: 2, c: 3 }

console.log("\n--- (7.5) Максимум ---");
const values = [3, 7, 2, 9, 1, 5];
const max = reduce(values, (acc, el) => el > acc ? el : acc);
console.log("Array:", values);
console.log("Max:", max); // 9
