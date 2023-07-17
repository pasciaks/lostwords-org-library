const puzzleMakerLibrary = require("./index");

let result;

console.log("\nIntentional Failing\n");

try {
  result = puzzleMakerLibrary.createManyPuzzles(0);
} catch (error) {
  console.log("Error:", error);
  result = [];
}

console.log("Puzzles Created:", result.length);

console.log("\nHopefully, Intentional Passing\n");

try {
  result = puzzleMakerLibrary.createManyPuzzles(1);
} catch (error) {
  console.log("Error:", error);
}

console.log("Puzzles:", result);

console.log("");

console.log("Puzzles Created:", result.length);
