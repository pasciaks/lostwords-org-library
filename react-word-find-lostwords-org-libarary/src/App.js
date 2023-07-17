import React, { useState } from "react";

import "./App.css";

const lwLibrary = require("@pasciaks/lostwords-org-library");

let puzzleSize = 8;

lwLibrary.setGlobalOptionValue("global_squarePuzzleSize", puzzleSize);

lwLibrary.setGlobalOptionValue(
  "global_p_words",
  "NOW,IS,THE,TIME,FOR,ALL,GOOD,MEN,TO,LEARN,HOW,TWO,CODE,IN,REACT"
);

function App() {
  const [value, setValue] = useState(lwLibrary.createManyPuzzles(1));

  const convertString = (string_value) => {
    if (value) {
      console.log(value[0].p_locations);
    }
    let c = "red";
    let extra = "font-weight:200;";
    let index = 0;
    let currentLine = "";
    let currentLineAscii = "";

    if (!string_value) return;

    for (let i = 0; i < puzzleSize; i++) {
      for (let j = 0; j < puzzleSize; j++) {
        c = "red";
        extra = "font-weight:200;";

        let anyFound = false;

        for (let ii = 0; ii < value[0].p_locations.length; ii++) {
          let howManyPoints = value[0].p_locations[ii].split(",");

          // console.log(howManyPoints);

          for (let jj = 0; jj < howManyPoints.length; jj += 2) {
            // console.log(`${i},${j} === ${howManyPoints[jj]},${howManyPoints[jj + 1]}`);

            if (howManyPoints[jj] == j + 1) {
              if (howManyPoints[jj + 1] == i + 1) {
                anyFound = true;
              }
            }
          }
        }

        if (anyFound) {
          c = "blue;";
          extra = "font-weight:900;";
        }

        currentLine +=
          `&nbsp;<span style='${extra}color:${c}'>` +
          string_value.substring(index, index + 1) +
          "</span>";

        currentLineAscii += "." + string_value.substring(index, index + 1);

        index++;
      }
      currentLine += "<BR />";
      currentLineAscii += "\n";
    }
    console.log(currentLineAscii);
    return currentLine;
  };

  return (
    <>
      <div className="App">
        <div
          dangerouslySetInnerHTML={{ __html: convertString(value[0].p_data) }}
        />
      </div>
      <h2>
        <a href="/">Generate again!</a>
      </h2>
    </>
  );
}

export default App;
