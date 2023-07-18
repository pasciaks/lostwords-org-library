import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import "./App.css";

const lwLibrary = require("@pasciaks/lostwords-org-library");

let consoletext = `
888                       888    888       888                      888          
888                       888    888   o   888                      888          
888                       888    888  d8b  888                      888          
888      .d88b.  .d8888b  888888 888 d888b 888  .d88b.  888d888 .d88888 .d8888b  
888     d88""88b 88K      888    888d88888b888 d88""88b 888P"  d88" 888 88K      
888     888  888 "Y8888b. 888    88888P Y88888 888  888 888    888  888 "Y8888b. 
888     Y88..88P      X88 Y88b.  8888P   Y8888 Y88..88P 888    Y88b 888      X88 
88888888 "Y88P"   88888P'  "Y888 888P     Y888  "Y88P"  888     "Y88888  88888P' 
                                                                                 
                                              
`; // thanks to https://patorjk.com/software/taag/#p=display&f=Colossal&t=Lost%0AWords

let resultHtml;

resultHtml = consoletext.replace(/(?:\r\n|\r|\n)/g, "<br>");

resultHtml = resultHtml.replace(/\s/g, "&nbsp;");

let puzzleSize = 8;

lwLibrary.setGlobalOptionValue("global_squarePuzzleSize", puzzleSize);

lwLibrary.setGlobalOptionValue("global_p_words", "LOST,WORDS");

lwLibrary.setGlobalOptionValue("global_p_bends", 1);

function App() {
  const [value, setValue] = useState("LOST,WORDS");
  const [showAnswers, setShowAnswers] = useState(0);
  const [hintsOnly, setHintsOnly] = useState(true);

  // const [time, setTime] = useState("");

  const getWords = async () => {
    // https://random-word-api.herokuapp.com/word?number=10

    let result = "";

    // https://random-word-api.herokuapp.com/home
    let wordListToGenerateInPuzzle = await axios
      .get(
        "https://random-word-api.herokuapp.com/word?number=5&length=6&lang=en"
      )
      .then(function (response) {
        result = response.data.join(",");
      })
      .catch(function () {
        result = "LOST,WORDS";
      })
      .finally(function () {
        return result;
      });

    wordListToGenerateInPuzzle = result?.toUpperCase();

    let array = wordListToGenerateInPuzzle.split(",");
    array = array.sort();
    wordListToGenerateInPuzzle = array.join(",");

    lwLibrary.setGlobalOptionValue(
      "global_p_words",
      wordListToGenerateInPuzzle
    );

    let rr = lwLibrary.createManyPuzzles(1);

    setValue(rr);

    return wordListToGenerateInPuzzle;
  };

  const convertString = (string_value) => {
    if (!value) {
      return;
    }
    let c = "red";
    let extra = "font-weight:200;";
    let index = 0;
    let currentLine = "";

    if (!string_value) return;

    for (let i = 0; i < puzzleSize; i++) {
      for (let j = 0; j < puzzleSize; j++) {
        c = "red";
        extra = "font-weight:200;";
        let anyFound = false;
        let showHowManyHintLetters = value[0].p_locations.length;

        if (hintsOnly) {
          showHowManyHintLetters = showAnswers;
        }
        for (let ii = 0; ii < value[0].p_locations.length; ii++) {
          let howManyPoints = value[0].p_locations[ii].split(",");
          for (let jj = 0; jj < showHowManyHintLetters; jj += 2) {
            // eslint-disable-next-line
            if (howManyPoints[jj] == j + 1) {
              // eslint-disable-next-line
              if (howManyPoints[jj + 1] == i + 1) {
                anyFound = true;
              }
            }
          }
        }

        if (showAnswers) {
          if (anyFound) {
            c = "blue;";
            extra = "font-weight:900;";
          }
        }

        currentLine +=
          `&nbsp;<span style='${extra}color:${c}'>` +
          string_value.substring(index, index + 1) +
          "</span>";
        index++;
      }
      currentLine += "<BR />";
    }

    return currentLine;
  };

  useEffect(() => {}, [value, showAnswers]);

  return (
    <>
      <div className="App">
        <div className="container">
          <Row>
            <p
              className={"fs-6"}
              dangerouslySetInnerHTML={{ __html: resultHtml }}
            />
          </Row>
          <Row>
            <Col>
              <button onClick={getWords}>Create</button>
              {/* @todo - convert to function call and not inline button click */}
              <button
                onClick={() => {
                  let cv = showAnswers;
                  if (cv === 0) {
                    setShowAnswers(1);
                  } else if (cv === 1) {
                    setShowAnswers(99);
                  } else {
                    setShowAnswers(0);
                  }
                }}
              >
                Answers
              </button>
              {/* @todo - convert to function call and not inline button click */}
              <button
                onClick={() => {
                  puzzleSize = 8;
                  lwLibrary.setGlobalOptionValue(
                    "global_squarePuzzleSize",
                    puzzleSize
                  );
                  getWords();
                }}
              >
                8
              </button>
              {/* @todo - convert to function call and not inline button click */}
              <button
                onClick={() => {
                  puzzleSize = 14;
                  lwLibrary.setGlobalOptionValue(
                    "global_squarePuzzleSize",
                    puzzleSize
                  );
                  getWords();
                }}
              >
                14
              </button>
            </Col>

            <Col>
              <div dangerouslySetInnerHTML={{ __html: value[0].p_words }} />
              <div
                dangerouslySetInnerHTML={{
                  __html: convertString(value[0].p_data),
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default App;
