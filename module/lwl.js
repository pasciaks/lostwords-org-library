"use strict";

import * as lwl from './lwl.mjs';

import {createManyPuzzles, setGlobalOptionValue} from "./lwl-generator.mjs";

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
}

function generatePuzzle() {

    let puzzleSize = Number(prompt('Enter puzzle size', "10"));

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

    console.log(result);
    console.log(puzzle.p_locations);
    console.log("Words successfully hidden: ", JSON.stringify(puzzle.p_words));
    document.getElementById('puzzle-ascii').innerHTML = puzzleLine;


}

let createPathsButton = document.getElementById('create-paths-button');
createPathsButton.addEventListener('click', createPaths);

let generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generatePuzzle);

let pathsFound = document.getElementById('paths-found');



