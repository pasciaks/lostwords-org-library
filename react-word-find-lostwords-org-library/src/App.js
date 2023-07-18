import React, { useState } from "react";

import "./App.css";

const lwLibrary = require("@pasciaks/lostwords-org-library");

let consoletext = `

888                       888                   
888                       888                   
888                       888                   
888      .d88b.  .d8888b  888888                
888     d88""88b 88K      888                   
888     888  888 "Y8888b. 888                   
888     Y88..88P      X88 Y88b.                 
88888888 "Y88P"   88888P'  "Y888                
                                                
                                                
                                                
888       888                      888          
888   o   888                      888          
888  d8b  888                      888          
888 d888b 888  .d88b.  888d888 .d88888 .d8888b  
888d88888b888 d88""88b 888P"  d88" 888 88K      
88888P Y88888 888  888 888    888  888 "Y8888b. 
8888P   Y8888 Y88..88P 888    Y88b 888      X88 
888P     Y888  "Y88P"  888     "Y88888  88888P' 
                                                
                                                
`; // thanks to https://patorjk.com/software/taag/#p=display&f=Colossal&t=Lost%0AWords

console.log(consoletext);

let puzzleSize = 8;

lwLibrary.setGlobalOptionValue("global_squarePuzzleSize", puzzleSize);

lwLibrary.setGlobalOptionValue(
  "global_p_words",
  "NOW,IS,THE,TIME,FOR,ALL,GOOD,MEN,TO,LEARN,HOW,TWO,CODE,IN,REACT"
);

function App() {
  const [value, setValue] = useState(lwLibrary.createManyPuzzles(1));

  const convertString = (string_value) => {
    if (!value) {
      return;
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
          for (let jj = 0; jj < howManyPoints.length; jj += 2) {
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
