"use strict";

import * as lwl from './lwl.mjs';

let pathsFound = document.getElementById('paths-found');

import {createManyPuzzles, setGlobalOptionValue} from "./lwl-generator.mjs";

function createP(e) {
    e?.preventDefault();
    let result = createPaths();
    console.log(result);
}

function createPaths() {
    let theWord = document.getElementById('the-word').value.trim().toUpperCase();
    let result = lwl.findAllSnakePaths(theWord, 1, null, null, [[1, 1]]);
    result.forEach((path) => {
        console.log(JSON.stringify(path));

        let pathString = '';
        path.forEach((coords) => {
            pathString += `(${coords[0]}, ${coords[1]}) `;
        });
        pathsFound.innerHTML += `<p>${pathString}</p>`;
    });
    return result;
}

function generateP(e) {
    e?.preventDefault();
    // generatePuzzle(['one', 'two', 'three']);

    let result = generatePuzzle("LOST,WORDS,SHELDON,PASCIAK");
    console.log(result);
}

function generatePuzzle(optionalWordsArray=[]) {

    if (optionalWordsArray) {
        if (Array.isArray(optionalWordsArray)) {
            optionalWordsArray = optionalWordsArray.map((word) => {
                return word.trim().toUpperCase();
            });
        } else if (typeof optionalWordsArray === 'string') {
            optionalWordsArray = optionalWordsArray.split(',').map((word) => {
                return word.trim().toUpperCase();
            });
        }
    }

    setGlobalOptionValue('global_p_words', optionalWordsArray.join(","));

    let puzzleSize = Math.floor(Number(prompt('Enter puzzle size: Min 2, Max 333', "8")));

    if (isNaN(puzzleSize) || puzzleSize < 2 || puzzleSize > 333) {
        alert("Invalid puzzle size");
        return;
    }

    setGlobalOptionValue('global_squarePuzzleSize', puzzleSize);

    setGlobalOptionValue('global_p_bends', 99);

    let result = createManyPuzzles(1);

    let puzzle = result[0];

    let puzzleLine = '';

    let puzzleStringData = puzzle.p_data;

    let lineCount = 0;

    for (let i = 0; i < puzzleSize ** 2; i++) {

        puzzleLine += puzzleStringData[i] + '&nbsp;';

        lineCount++;

        if (lineCount === puzzleSize) {
            lineCount = 0;
            puzzleLine += '\n';
        }
    }

    if (!result) {
        console.log("No puzzle generated");
        document.getElementById('puzzle-ascii').innerHTML = "No puzzle generated, perhaps your words are too long or your size is too small?";
        return;
    }

    let arrayOfWordsHidden = puzzle.p_words.map((word) => {
        return word;
    });

    arrayOfWordsHidden.forEach((word) => {
        console.log(word);
    });

    document.getElementById('puzzle-ascii').innerHTML = puzzleLine;

    return result;

}

let createPathsButton = document.getElementById('create-paths-button');
createPathsButton.addEventListener('click', createP);

let generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generateP);
