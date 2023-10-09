const puzzleMakerLibrary = require("./index");

let result;

try {
  result = puzzleMakerLibrary.createManyPuzzles(1);
} catch (error) {
  console.log("Error:", error);
}

console.log("Puzzles:", result);
