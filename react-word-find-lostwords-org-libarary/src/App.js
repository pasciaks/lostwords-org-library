import React, { useState, useEffect } from "react";

import "./App.css";

const { createManyPuzzles } = require("@pasciaks/lostwords-org-library");

const generatePuzzle = () => {
  return createManyPuzzles(1);
};

function App() {
  const [value, setValue] = useState(generatePuzzle());

  const convertString = (string_value) => {
    let index = 0;
    let currentLine = "";
    if (!string_value) return;
    for (var i = 0; i < 14; i++) {
      for (var j = 0; j < 14; j++) {
        currentLine += "&nbsp;" + string_value.substring(index, index + 1);
        index++;
      }
      currentLine += "<BR />";
    }
    console.log(currentLine);
    return currentLine;
  };

  return (
    <div className="App">
      <div
        dangerouslySetInnerHTML={{ __html: convertString(value[0].p_data) }}
      />
    </div>
  );
}

export default App;
