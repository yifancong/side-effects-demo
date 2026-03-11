/**
 * A simple utility module with multiple exports.
 * Used to demonstrate CJS require vs CJS full require tree-shaking behavior.
 */

exports.add = function add(a, b) {
  return a + b;
};

exports.subtract = function subtract(a, b) {
  return a - b;
};

exports.multiply = function multiply(a, b) {
  return a * b;
};

exports.divide = function divide(a, b) {
  return a / b;
};
