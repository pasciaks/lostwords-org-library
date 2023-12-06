"use strict";

import * as lwl from './lwl.mjs';

let generateButton = document.getElementById('generate-button');
generateButton.addEventListener('click', generatePuzzle);

function generatePuzzle() {
  let theWord = document.getElementById('the-word').value.trim().toUpperCase();
  let result = lwl.findAllSnakePaths(theWord, 1);
  result.forEach((path) => {
    console.log(JSON.stringify(path));
  });
}

