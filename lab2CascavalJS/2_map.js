function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

console.log("\n--- Тест map ---");
const numbers = [1, 2, 3];
const doubles = map(numbers, (num) => num * 2);
console.log("Original:", numbers);
console.log("Mapped (x2):", doubles); // [2, 4, 6]