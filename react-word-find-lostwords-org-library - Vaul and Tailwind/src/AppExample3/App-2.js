import React from "react";

import Wordsearch from "./Components/Wordsearch";

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

import "./App.css";

let settings = {
  numberWords: 1,
  lengthWords: 6,
  languageWords: "en",
};

function App() {
  return (
    <>
      <div className="App">
        <Wordsearch {...settings} />
      </div>
    </>
  );
}

export default App;
