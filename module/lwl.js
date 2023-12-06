"use strict";

import * as lwl from './lwl.mjs';

let generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generatePuzzle);

let pathsFound = document.getElementById('paths-found');

function generatePuzzle() {
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

