import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

import { Drawer } from 'vaul';

import Wordsearch from "./Components/Wordsearch";

const outlineBtn = " bg-transparent hover:text-black text-blue-700 font-semibold py-1 px-1 border border-blue-500 hover:border-transparent rounded";
const normalBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded";
const pillBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full";
const borderedBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded";

const defaultButton = normalBtn;

function StyledMyComponent(props) {

  return (
    <Drawer.Root dismissible={false} open={props.open}>
      <Drawer.Trigger asChild onClick={() => props.setOpen(true)}>
        <button className={outlineBtn}>Open Settings</button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-small m-1">
                Drawer
              </Drawer.Title>
              {props.children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

function MyComponent(props) {
  return (
    <Drawer.Root>
      <Drawer.Trigger className={borderedBtn}>Open Alternative word generator</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px]">
          {props.children}
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}


// @todo - make this a portable component and respect eslint rules for prettier code formatter, etc.

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

lwLibrary.setGlobalOptionValue("global_p_bends", 33);

function App() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("LOST,WORDS");
  const [showAnswers, setShowAnswers] = useState(999);
  const [num, setNum] = useState(5);

  const [stored, setStored] = useState(null);

  // const [time, setTime] = useState("");

  function convertWords(str = "") {
    let text = `${str}`;
    let totalText = "";
    // text = text.replace(/,/g, " ");
    let array = text.split(",");
    for (var i = 0; i < array.length; i++) {
      let s2 = `${array[i]}<a target="_blank" rel="noreferrer noopener" href='https://www.google.com/search?q=${array[i]}&sourceid=chrome&ie=UTF-8'>(google)</a>`;
      let ss = `<a target="_blank" rel="noreferrer noopener" href='https://www.merriam-webster.com/dictionary/${array[i]}'>(websters)</a>`;

      if (totalText !== "") {
        totalText += "<br />";
      }
      totalText += s2 + "" + ss;
    }
    return totalText;
  }

  const getWords = async (newWords = true, number) => {

    if (!number) {
      number = num;
    }
    // https://random-word-api.herokuapp.com/word?number=10

    let result = "";

    // https://random-word-api.herokuapp.com/home
    let wordListToGenerateInPuzzle = await axios
      .get(
        `https://random-word-api.herokuapp.com/word?number=${number}&length=6&lang=en`
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

    if (newWords) {
      setStored(result);
    } else {
      result = stored;
    }

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

        showHowManyHintLetters = showAnswers;

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

  const closeDrawer = () => {
    setOpen(false);
  }

  const setone = () => {
    setNum(1);
    getWords(true, 1);
  };

  const setfive = () => {
    setNum(5);
    getWords(true, 5);
  };

  return (
    <>
      <div className="App">
        <p>Lostwords</p>
        <a href="http://lostwords.org" style={{ textDecoration: "none" }}>
          {!open && (
            <p
              className={"fs-6 content-to-hide"}
              dangerouslySetInnerHTML={{ __html: resultHtml }}
            />
          )}
        </a>
        {/* </Row> */}

        {!open2 && (
          <Row>
            <Col>
              <StyledMyComponent open={open} setOpen={setOpen}>

                <button className={`${defaultButton}`} onClick={getWords}>Create</button>

                <button className={`${defaultButton}`}
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

                <button className={`${defaultButton}`} onClick={setone}>Words 1</button>

                <button className={`${defaultButton}`} onClick={setfive}>Words 5</button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    puzzleSize = 8;
                    lwLibrary.setGlobalOptionValue(
                      "global_squarePuzzleSize",
                      puzzleSize
                    );
                    getWords(false);
                  }}
                >
                  Size 8
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    puzzleSize = 14;
                    lwLibrary.setGlobalOptionValue(
                      "global_squarePuzzleSize",
                      puzzleSize
                    );
                    getWords(false);
                  }}
                >
                  Size 14
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 0);
                    getWords(false);
                  }}
                >
                  Max Bends 0
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 1);
                    getWords(false);
                  }}
                >
                  Bends 1
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 9);
                    getWords(false);
                  }}
                >
                  Bends 9
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 999);
                    getWords(false);

                  }}
                >
                  Bends 999
                </button>

                <button className={`${defaultButton}`}
                  onClick={() => {
                    closeDrawer();
                  }}
                >
                  CLOSE
                </button>

              </StyledMyComponent>

              <hr></hr>

              <div
                className={"fs-6"}
                dangerouslySetInnerHTML={{
                  __html: convertWords(value[0].p_words),
                }}
              />
              <div
                className={"fs-4 text-center"}
                dangerouslySetInnerHTML={{
                  __html: convertString(value[0].p_data),
                }}
              />
            </Col>
          </Row>
        )}
        <Row>

          <Col>
            <MyComponent open={open2} setOpen={setOpen2}>
              <hr></hr>
              <p>--==[Drag down to close]==--</p>
              <hr></hr>
              <Wordsearch defaultButtonClass={pillBtn} />
            </MyComponent>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default App;
