/**
 * 
 * Although not using a testing library like Jest, this file is used to test the library.
 * 
 */

const puzzleMakerLibrary = require("./index");

let result;

try {
  result = puzzleMakerLibrary.createManyPuzzles(1);
} catch (error) {
  console.log("Error:", error);
}

console.log("Puzzles:", result);
