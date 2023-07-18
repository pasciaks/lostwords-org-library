import React, { useEffect, useState } from "react";
import axios from "axios";
// import logo from "./images/bmc_qr.png";
import { Row, Col } from "react-bootstrap";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./index.css";

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

lwLibrary.setGlobalOptionValue("global_p_words", "LOST,WORDS");

lwLibrary.setGlobalOptionValue("global_p_bends", 1);

function App() {
  const [value, setValue] = useState("LOST,WORDS");
  const [showAnswers, setShowAnswer] = useState(false);

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
        // handle success
        result = response.data.join(",");
      })
      .catch(function (error) {
        // handle error
        result = "LOST,WORDS";
      })
      .finally(function () {
        // always executed
        return result;
      });

    console.log(result);

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
    // let currentLineAscii = "";

    if (!string_value) return;

    for (let i = 0; i < puzzleSize; i++) {
      for (let j = 0; j < puzzleSize; j++) {
        c = "red";
        extra = "font-weight:200;";
        let anyFound = false;
        for (let ii = 0; ii < value[0].p_locations.length; ii++) {
          let howManyPoints = value[0].p_locations[ii].split(",");
          for (let jj = 0; jj < howManyPoints.length; jj += 2) {
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

        // currentLineAscii += "." + string_value.substring(index, index + 1);

        index++;
      }
      currentLine += "<BR />";
      // currentLineAscii += "\n";
    }
    // console.log(currentLineAscii);
    return currentLine;
  };

  useEffect(() => {
    // If the below code is enabled, will refresh rerender ever 1 second
    // const intervalId = setInterval(() => {
    //   setTime(new Date().toLocaleString());
    // }, 1000);
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [value]);

  return (
    <>
      <div className="App">
        <div className="container">
          {/* <img src={logo} width={100} height={100} alt="buy me a coffee" /> */}

          <Row>
            <Col>
              <button onClick={getWords}>Create</button>
            </Col>
            <Col>
              <button
                onClick={() => {
                  setShowAnswer(!showAnswers);
                }}
              >
                Answers
              </button>
            </Col>
            <Col>
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
            </Col>
            <Col>
              {" "}
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
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <br />
              <div dangerouslySetInnerHTML={{ __html: value[0].p_words }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />

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
