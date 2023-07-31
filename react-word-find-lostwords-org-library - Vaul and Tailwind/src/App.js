import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

import { Drawer } from 'vaul';

import Wordsearch from "./Components/Wordsearch";

const outlineBtn = "hover:text-red-600 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";
const normalBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const pillBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full";
const borderedBtn = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";

const defaultButton = normalBtn;

function StyledMyComponent(props) {

  return (
    <Drawer.Root dismissible={false} open={props.open}>
      <Drawer.Trigger asChild onClick={() => props.setOpen(true)}>
        <button class={outlineBtn}>Open Settings</button>
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Unstyled drawer for React.
              </Drawer.Title>
              {props.children}
            </div>
          </div>
          <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">

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
      <Drawer.Trigger class={borderedBtn}>Open Alternative word generator</Drawer.Trigger>
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

  const getWords = async () => {
    // https://random-word-api.herokuapp.com/word?number=10

    let result = "";

    // https://random-word-api.herokuapp.com/home
    let wordListToGenerateInPuzzle = await axios
      .get(
        `https://random-word-api.herokuapp.com/word?number=${num}&length=6&lang=en`
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

    setValue(rr); setOpen(false);

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

  const setone = () => {
    setNum(1);
    getWords(); setOpen(false);
  };

  const setfive = () => {
    setNum(5);
    getWords(); setOpen(false);
  };

  useEffect(() => { }, [value, showAnswers]);

  useEffect(() => {
    getWords(); setOpen(false);
    // eslint-disable-next-line
  }, [num]);

  return (
    <>
      <div className="App">
        <p>Lostwords</p>
        <a href="http://lostwords.org" style={{ textDecoration: "none" }}>
          <p
            className={"fs-6 content-to-hide"}
            dangerouslySetInnerHTML={{ __html: resultHtml }}
          />
        </a>
        {/* </Row> */}

        {!open2 && (
          <Row>
            <Col>
              <StyledMyComponent open={open} setOpen={setOpen}>
                <hr></hr>
                <button class={`${defaultButton}`} onClick={getWords}>Create</button>{" "}
                <button class={`${defaultButton}`}
                  onClick={() => {
                    let cv = showAnswers;
                    if (cv === 0) {
                      setShowAnswers(1);
                      setOpen(false);
                    } else if (cv === 1) {
                      setShowAnswers(99);
                      setOpen(false);
                    } else {
                      setShowAnswers(0);
                      setOpen(false);
                    }
                  }}
                >
                  Answers
                </button>
                <br />
                <button class={`${defaultButton}`} onClick={setone}>Words 1</button>{" "}
                <button class={`${defaultButton}`} onClick={setfive}>Words 5</button>
                {/* @todo - convert to function call and not inline button click */}
                <br />
                {/* @todo - convert to function call and not inline button click */}
                <button class={`${defaultButton}`}
                  onClick={() => {
                    puzzleSize = 8;
                    lwLibrary.setGlobalOptionValue(
                      "global_squarePuzzleSize",
                      puzzleSize
                    );
                    getWords(); setOpen(false);
                  }}
                >
                  Size 8
                </button>
                <button class={`${defaultButton}`}
                  onClick={() => {
                    puzzleSize = 14;
                    lwLibrary.setGlobalOptionValue(
                      "global_squarePuzzleSize",
                      puzzleSize
                    );
                    getWords(); setOpen(false);
                  }}
                >
                  Size 14
                </button>
                <br />
                {/* @todo - convert to function call and not inline button click */}
                <button class={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 0);
                    getWords(); setOpen(false);
                  }}
                >
                  Max Bends 0
                </button>
                <button class={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 1);
                    getWords(); setOpen(false);
                  }}
                >
                  Bends 1
                </button>
                <button class={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 9);
                    getWords(); setOpen(false);
                  }}
                >
                  Bends 9
                </button>
                <button class={`${defaultButton}`}
                  onClick={() => {
                    lwLibrary.setGlobalOptionValue("global_p_bends", 999);
                    getWords();
                    setOpen(false);
                  }}
                >
                  Bends 999
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
              <Wordsearch defaultButtonClass={pillBtn} />
            </MyComponent>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default App;
