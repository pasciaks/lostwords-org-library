// const fs = require("fs");
// const path = require("path");

// -- Externally configurable
let global_squarePuzzleSize = 14;
let global_p_bends = 0; // 0-999, use 999 for only90DegreeTurns only
let global_allowWriteToDisk = false;
let global_puzzleshapeoverride = "";
let global_diagonals = "yes";
let global_wordlistoption = "B";
let global_title_name = "";
let global_clueoption = "U"; // note: using a U here means don't allow duplicating use of letters
let global_blanks = ""; //"[WORDLETTERS]"; //""; // "."; //"abcdefghijklmnopqrstuvwxyz1234567890";
let global_p_words = "LOST,WORDS";
let global_post_msg = "Puzzle Solved";
let global_pre_msg = "Good Luck";

// -- Internal Use
let global_noDiagonals = false;
let global_puzzleData = "";
let global_letterChoices = "";
let global_p_data = "";
let global_p_locations = "";
let global_wordLetters = "";
let global_shrinkamt = 0;
let global_frect = "9,9,9,9, ";
let global_point = new Object();
let global_currentPath = new Array();
let global_locationsArray = new Array();
let global_foundLocations = new Array();
let global_showConsoleMessages = false;

const setGlobalOptionValue = (variable, val) => {
  switch (variable) {
    case "global_squarePuzzleSize":
      global_squarePuzzleSize = val;
      break;
    case "global_p_bends":
      global_p_bends = val;
      break;
    case "global_allowWriteToDisk":
      global_allowWriteToDisk = !!val; // force boolean result;
      break;
    case "global_puzzleshapeoverride":
      global_puzzleshapeoverride = val;
      break;
    case "global_diagonals":
      global_diagonals = val;
      break;
    case "global_wordlistoption":
      global_wordlistoption = val;
      break;
    case "global_title_name":
      global_title_name = val;
      break;
    case "global_clueoption":
      global_clueoption = val;
      break;
    case "global_blanks":
      global_blanks = val;
      break;
    case "global_p_words":
      global_p_words = `${val}`;
      break;
    case "global_post_msg":
      global_post_msg = val;
      break;
    case "global_pre_msg":
      global_pre_msg = val;
      break;
  }
};

/**
 * reverseString
 *
 * @param {string} string_value
 * @returns {string || null}
 */
const reverseString = (string_value) => {
  if (!string_value) return null;
  let new_string_value = "";
  for (i = string_value.length - 1; i >= 0; i--) {
    new_string_value += string_value.charAt(i);
  }
  return new_string_value;
};

/**
 *
 * @param {*} str
 * @returns
 */
const scramble = (str) => {
  let scrambled = "",
    src = str.split("");
  let randomNum;
  while (src.length > 1) {
    randomNum = Math.floor(Math.random() * src.length);
    scrambled += src[randomNum];
    src.splice(randomNum, 1);
  }
  scrambled += src[0];
  return scrambled;
};

/**
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
const randRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *
 * @param {*} howManyShrunk
 * @param {*} xx
 * @param {*} yy
 * @param {*} rr
 * @param {*} bb
 * @param {*} cc
 */
const shrinkPuzzle = (howManyShrunk, xx, yy, rr, bb, cc) => {
  for (let i = 1; i <= global_squarePuzzleSize; i++) {
    for (let r = 1; r <= global_squarePuzzleSize; r++) {
      if (i > xx)
        if (i <= global_squarePuzzleSize - rr)
          if (r > yy)
            if (r <= global_squarePuzzleSize - bb) setLetter(i, r, cc);
    }
  }

  for (let i = 1; i <= global_squarePuzzleSize; i++) {
    for (let r = 1; r <= global_squarePuzzleSize; r++) {
      if (i > howManyShrunk)
        if (i <= global_squarePuzzleSize - howManyShrunk)
          if (r > howManyShrunk)
            if (r <= global_squarePuzzleSize - howManyShrunk)
              setLetter(i, r, cc);
    }
  }

  for (let i = 1; i <= global_squarePuzzleSize; i++) {
    for (let r = 1; r <= global_squarePuzzleSize; r++) {
      if (getLetter(i, r) == " ") {
        setLetter(i, r, "-"); // "-"
      } else {
        setLetter(i, r, " "); // " "
      }
    }
  }
};

/**
 *
 * @param {*} howManyToCreate
 * @returns
 */
const createManyPuzzles = (howManyToCreate = 1) => {
  let resultsArray = [];

  for (let i = 0; i < howManyToCreate; i++) {
    makeLetterSet();
    resultsArray.push(createPuzzle());
  }

  if (resultsArray.length < 1) {
    throw new Error(
      "Failed. Usage: createManyPuzzles(number), where number is an Integer > 0"
    );
  }

  return resultsArray;
};

/**
 *
 * @returns
 */
const createPuzzle = () => {
  global_wordLetters = "";
  global_foundLocations = new Array();
  createEmptyPuzzle(global_squarePuzzleSize);

  let commas = global_frect;
  let ppps = commas.split(",");

  shrinkPuzzle(
    global_shrinkamt,
    Number(ppps[0]),
    Number(ppps[1]),
    Number(ppps[2]),
    Number(ppps[3]),
    ppps[4]
  );

  let ps = global_puzzleshapeoverride;

  if (ps !== "") createEmptyPuzzleShape(global_squarePuzzleSize, ps);

  global_p_locations = "";

  let wordList = global_p_words.split(","); // global_p_words.replace(/ /g, "").split(",");

  let maxBends = global_p_bends;

  let pp = "";

  if (maxBends < 1) {
    pp = global_diagonals;

    if (pp == "no") {
      global_noDiagonals = true;
    } else {
      global_noDiagonals = false;
    }
  }

  let howManyHidden = 0;

  let missingWords = "";

  let hiddenWords = "";

  for (let index = 0; index < wordList.length; index++) {
    let result = "false";
    let attempts = 0;
    do {
      result = hideWordInPuzzle(maxBends, wordList[index]);
      attempts++;
    } while (result == "false" && attempts < 6666);

    if (result == "false") {
      if (missingWords == "") {
        missingWords += wordList[index] + "";
      } else {
        missingWords += "," + wordList[index] + "";
      }
      if (global_showConsoleMessages)
        console.log("NOT Hidden:" + wordList[index]);
    } else {
      howManyHidden++;
      global_wordLetters += wordList[index];
      if (hiddenWords === "") {
        hiddenWords = wordList[index];
      } else {
        hiddenWords += "," + wordList[index];
      }
    }
  }

  global_p_words = hiddenWords;

  fillBlanks(global_blanks);

  global_p_data = global_puzzleData;

  let result2 = createSqlFromFilledform();

  let hview = `

  <!DOCTYPE html>
  <html>
  <head>
  <link href='https://fonts.googleapis.com/css?family=Courier Prime' rel='stylesheet'>
  <style>

  body {
      font-family: 'Courier Prime';font-size: 22px;
      line-height: 80%;
  }
  
  </style>

  </head>

  <body>
  
  {{content}}
  
  </body>

  </html>

  `;

  let ss = "";
  let filedata = "";
  let hdata = "";

  for (let i = 0; i < global_squarePuzzleSize * global_squarePuzzleSize; i++) {
    if (i % global_squarePuzzleSize == 0 && i > 0) {
      if (global_showConsoleMessages) console.log(ss);
      filedata += ss + "\n";
      hdata += ss.replace(/ /g, "&nbsp;") + "<br />";
      ss = "";
    }
    ss += global_p_data.charAt(i);
  }

  filedata += ss + "\n";
  hdata += ss.replace(/ /g, "&nbsp;") + "<br />";

  if (global_showConsoleMessages) console.log(ss);

  let createdAtId = Date.now();

  hview = hview.replace("{{content}}", hdata);

  // if (global_allowWriteToDisk) {
  //   if (global_showConsoleMessages) console.log("");
  //   if (global_showConsoleMessages) console.log("Creating files on disk.");
  //   if (global_showConsoleMessages) console.log("");

  //   let targetFolder = path.join(__dirname, "_Created");

  //   if (fs.existsSync(targetFolder)) {
  //     if (global_showConsoleMessages) console.log("** EXISTS **");
  //   } else {
  //     if (global_showConsoleMessages) console.log("** DOES NOT EXIST **");

  //     fs.mkdirSync(targetFolder, { recursive: true });
  //   }

  //   fs.writeFileSync(
  //     path.join(targetFolder, `_created-${createdAtId}.txt`),
  //     filedata,
  //     "utf-8"
  //   );

  //   fs.writeFileSync(
  //     path.join(targetFolder, `_created-${createdAtId}.html`),
  //     hview,
  //     "utf-8"
  //   );

  //   fs.writeFileSync(
  //     path.join(targetFolder, `_created-${createdAtId}.json`),
  //     JSON.stringify(result2.created, 0, 2),
  //     "utf-8"
  //   );
  // }

  if (global_showConsoleMessages) console.log("");
  if (global_showConsoleMessages) console.log("Hidden");
  if (global_showConsoleMessages) console.log(hiddenWords);

  if (global_showConsoleMessages) console.log("");
  if (global_showConsoleMessages) console.log("Wordlist");
  if (global_showConsoleMessages) console.log(wordList.join(","));

  return result2.created;
};

/**
 *
 * @param {*} bends
 * @param {*} theWord
 * @returns
 */
const hideWordInPuzzle = (bends, theWord) => {
  let testX = randRange(1, global_squarePuzzleSize);
  let testY = randRange(1, global_squarePuzzleSize);
  let attempts = 0;

  do {
    testX = randRange(1, global_squarePuzzleSize);
    testY = randRange(1, global_squarePuzzleSize);
    global_currentPath = new Array();
    let diags = false;
    global_currentPath = createPath(bends, theWord, diags);
    if (attempts > 500) return "false";
    attempts++;
  } while (makePointsFromPath(testX, testY, theWord) === "false");

  if (setPointsFromPath(theWord) == false) {
    return false;
  }

  for (let jj = 0; jj < global_locationsArray.length; jj++) {
    if (global_p_locations === "") {
      global_p_locations =
        global_locationsArray[jj].x + "," + global_locationsArray[jj].y;
    } else {
      global_p_locations =
        global_p_locations +
        "," +
        global_locationsArray[jj].x +
        "," +
        global_locationsArray[jj].y;
    }
  }
  return "true";
};

/**
 *
 * @param {*} startc
 * @param {*} startr
 * @param {*} wordToUse
 * @returns
 */
const makePointsFromPath = (startc, startr, wordToUse) => {
  let sx = startc;
  let sy = startr;

  global_locationsArray = new Array();

  if (global_currentPath.length < 1) return "false";

  for (let index = 0; index < global_currentPath.length; index++) {
    if (sx < 1) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sx > global_squarePuzzleSize) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sy < 1) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sy > global_squarePuzzleSize) {
      global_locationsArray = new Array();
      return "false";
    }

    sx += global_currentPath[index].dx;
    sy += global_currentPath[index].dy;

    global_point = new Object();
    global_point.x = sx;
    global_point.y = sy;

    if (findPoint(sx, sy) === "true") {
      global_locationsArray = new Array();
      return "false";
    }

    if (getLetter(sx, sy) != "-") {
      if (global_clueoption == "U") {
        global_locationsArray = new Array();
        return "false";
      } else {
        if (getLetter(sx, sy) != wordToUse.substr(index, 1)) {
          global_locationsArray = new Array();
          return "false";
        }
      }
    }

    if (sx < 1) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sx > global_squarePuzzleSize) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sy < 1) {
      global_locationsArray = new Array();
      return "false";
    }
    if (sy > global_squarePuzzleSize) {
      global_locationsArray = new Array();
      return "false";
    }

    global_locationsArray.push(global_point);
  }

  return "true";
};

/**
 *
 * @param {*} wordToUse
 * @returns
 */
const setPointsFromPath = (wordToUse) => {
  let sx = 0;
  let sy = 0;
  let letter = "";

  for (let ii = 0; ii < global_foundLocations.length; ii++) {
    if (global_foundLocations[ii] == JSON.stringify(global_locationsArray)) {
      return false;
    }
  }

  global_foundLocations.push(JSON.stringify(global_locationsArray));

  for (let index = 0; index < global_locationsArray.length; index++) {
    sx = global_locationsArray[index].x;
    sy = global_locationsArray[index].y;
    letter = wordToUse.substr(index, 1);
    setLetter(sx, sy, letter);
  }
};

/**
 *
 * @param {*} valX
 * @param {*} valY
 * @returns
 */
const findPoint = (valX, valY) => {
  for (let index = 0; index < global_locationsArray.length; index++) {
    if (global_locationsArray[index].x === valX) {
      if (global_locationsArray[index].y === valY) {
        return "true";
      }
    }
  }

  return "false";
};

/**
 *
 * @param {*} maxBends
 * @param {*} wordToUse
 * @returns
 */
const createPath = (maxBends, wordToUse) => {
  let only90DegreeTurns = false;

  if (maxBends == 999) only90DegreeTurns = true;

  let howMany = wordToUse.length;

  global_currentPath = new Array();

  global_point = new Object();

  global_point.dx = 0;
  global_point.dy = 0;

  let dx = 0;
  let dy = 0;

  do {
    dx = 2 - randRange(1, 3); // -1, 0, 1
    dy = 2 - randRange(1, 3); // -1, 0, 1
  } while (
    (dx === 0 && dy === 0) ||
    (global_noDiagonals === true && dx !== 0 && dy !== 0)
  );

  let index = 0;

  let bendsCount = 0;

  let bendFrequency = 500 - maxBends * 50;

  do {
    if (bendsCount < maxBends) {
      if (randRange(1, 1000) > bendFrequency) {
        do {
          dx = 2 - randRange(1, 3); // -1, 0, 1
          dy = 2 - randRange(1, 3); // -1, 0, 1

          if (only90DegreeTurns) {
            if (Math.abs(dx) == Math.abs(dy)) {
              dx = 0;
              dy = 0;
            }
          }
        } while (
          (dx === 0 && dy === 0) ||
          (global_noDiagonals === true && dx !== 0 && dy !== 0)
        );

        bendsCount += 1;
      }
    }

    index += 1;

    global_point = new Object();

    global_point.dx = dx;
    global_point.dy = dy;

    global_currentPath.push(global_point);
  } while (index < howMany);

  return global_currentPath;
};

/**
 *
 * @param {*} global_squarePuzzleSize
 * @param {*} global_squarePuzzleSize
 * @param {*} data
 * @returns
 */
const createEmptyPuzzleShape = (global_squarePuzzleSize, data) => {
  global_puzzleData = data;

  let inc = 0;

  let charCount = global_squarePuzzleSize * global_squarePuzzleSize;

  for (inc = 0; inc < charCount; inc++) {
    global_puzzleData += "-";
  }

  return global_puzzleData;
};

/**
 *
 * @param {*} global_squarePuzzleSize
 * @param {*} global_squarePuzzleSize
 * @returns
 */
const createEmptyPuzzle = (global_squarePuzzleSize) => {
  global_puzzleData = "";

  let inc = 0;

  let charCount = global_squarePuzzleSize * global_squarePuzzleSize;

  for (inc = 0; inc < charCount; inc++) {
    global_puzzleData += "-";
  }

  return global_puzzleData;
};

/**
 *
 * @param {*} blankCharacters
 */
const fillBlanks = (blankCharacters) => {
  let letter = "";

  if (blankCharacters == "[WORDLETTERS]") {
    blankCharacters = global_wordLetters;
  }

  if (blankCharacters == "") {
    global_letterChoices = "" + makeLetterSet();
  } else {
    global_letterChoices = "" + blankCharacters;
  }

  // fail-safe
  if (!global_letterChoices || global_letterChoices == "") {
    global_letterChoices = "" + makeLetterSet();
  }

  for (let r = 1; r <= global_squarePuzzleSize; r++) {
    for (let c = 1; c <= global_squarePuzzleSize; c++) {
      if (getLetter(c, r) === "-") {
        letter =
          global_letterChoices[
            Math.floor(Math.random() * global_letterChoices.length)
          ];
        setLetter(c, r, letter);
      }
    }
  }
};

/**
 *
 * @param {*} col
 * @param {*} row
 * @returns
 */
const getLetter = (col, row) => {
  let letterPosition = col - 1 + (row - 1) * global_squarePuzzleSize;
  return global_puzzleData.charAt(letterPosition);
};

/**
 *
 * @param {*} col
 * @param {*} row
 * @param {*} letter
 */
const setLetter = (col, row, letter) => {
  let letterPosition = col - 1 + (row - 1) * global_squarePuzzleSize;
  global_puzzleData = setCharAt(global_puzzleData, letterPosition, letter);
};

/**
 *
 * @param {*} str
 * @param {*} index
 * @param {*} chr
 * @returns
 */
const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
};

/**
 * createSqlFromFilledform
 * @returns
 */
const createSqlFromFilledform = () => {
  let ArrayOfWords = new Array();
  ArrayOfWords = global_p_words.split(",");

  let ArrayOfClues = new Array();

  for (let ll = 0; ll < ArrayOfWords.length; ll++) {
    ArrayOfClues.push("");
  }

  let ArrayOfLocations = new Array();

  ArrayOfLocations = global_p_locations.split(",");

  let currentWordLength = 0;

  let sumOfLetters = 0;

  for (let index = 0; index < ArrayOfWords.length; index++) {
    currentWordLength = ArrayOfWords[index].length;
    sumOfLetters += currentWordLength;
  }

  let wordsString = "";
  let cluesString = "";
  let locationsString = "";

  for (let wl = 0; wl < ArrayOfWords.length; wl++) {
    if (wl === 0) {
      wordsString += ArrayOfWords[wl] + '"';
    } else {
      wordsString += "," + '"' + ArrayOfWords[wl] + '"';
    }
  }

  for (let wl = 0; wl < ArrayOfWords.length; wl++) {
    if (ArrayOfWords[wl]) {
      if (ArrayOfClues[wl] == "") {
        if (Math.random() > 0.5) {
          ArrayOfClues[wl] = "r_" + reverseString(ArrayOfWords[wl]);
        } else {
          ArrayOfClues[wl] = "s_" + scramble(ArrayOfWords[wl]);
        }
      }
    }

    if (wl === 0) {
      cluesString += ArrayOfClues[wl] + '"';
    } else {
      cluesString += "," + '"' + ArrayOfClues[wl] + '"';
    }
  }

  let coordsIndex = 0;
  let locarr = new Array();
  let coordsPair = '"';
  let coordLength = ArrayOfWords.length;
  let hasFailed = false;

  for (let wl = 0; wl < ArrayOfWords.length; wl++) {
    let wordLength = ArrayOfWords[wl].length;
    coordsPair = "";
    hasFailed = false;
    for (let ii = 0; ii < wordLength; ii++) {
      coordsPair += ArrayOfLocations[coordsIndex];

      if (ArrayOfLocations[coordsIndex] == undefined) {
        if (global_showConsoleMessages)
          console.log("----------------------------");
        if (global_showConsoleMessages) console.log(ArrayOfWords[wl]);
        if (global_showConsoleMessages)
          console.log("----------------------------");
        hasFailed = true;
      }
      coordsIndex++;
      coordsPair += "," + ArrayOfLocations[coordsIndex];

      if (ArrayOfLocations[coordsIndex] == undefined) {
        if (global_showConsoleMessages)
          console.log("----------------------------");
        if (global_showConsoleMessages) console.log(ArrayOfWords[wl]);
        if (global_showConsoleMessages)
          console.log("----------------------------");
        hasFailed = true;
      }
      coordsIndex++;
      if (ii < wordLength - 1) coordsPair += ",";
    }

    if (!hasFailed) {
      locarr.push(coordsPair);

      if (global_showConsoleMessages) console.log("\n");
      if (global_showConsoleMessages) console.log(coordsPair);
      if (global_showConsoleMessages) console.log("\n");
    }

    coordsPair += '"' + coordsPair + '"';

    locationsString += coordsPair;

    if (wl < coordLength - 1) locationsString += ",";
  }

  if (hasFailed) {
    if (global_showConsoleMessages) console.log("*** Something has failed ***");
    if (global_showConsoleMessages) console.log("*** Something has failed ***");
    if (global_showConsoleMessages) console.log("*** Something has failed ***");
  }

  let PuzzleName = global_title_name;

  if (PuzzleName == "") PuzzleName = "Untitled Puzzle";

  createdPuzzleObject = new Object();
  createdPuzzleObject.creator_id = 1;
  createdPuzzleObject.id = Date.now();
  createdPuzzleObject.creation_datetime = Date.now();
  createdPuzzleObject.title = PuzzleName;
  createdPuzzleObject.p_pre_msg = global_pre_msg;
  createdPuzzleObject.p_post_msg = global_post_msg;
  createdPuzzleObject.p_rows = global_squarePuzzleSize;
  createdPuzzleObject.p_cols = global_squarePuzzleSize;
  createdPuzzleObject.p_data = global_p_data;
  createdPuzzleObject.p_bends = global_p_bends;
  createdPuzzleObject.p_words = ArrayOfWords;
  createdPuzzleObject.p_locations = locarr;
  createdPuzzleObject.p_clues = ArrayOfClues;
  createdPuzzleObject.p_wordoptions = global_wordlistoption;
  createdPuzzleObject.p_clueoptions = global_clueoption;

  if (global_showConsoleMessages) console.log(createdPuzzleObject);

  return { created: createdPuzzleObject };
};

/**
 *
 * @returns
 */
const makeLetterSet = () => {
  let commonLetters = [
    "E",
    "T",
    "A",
    "O",
    "I",
    "N",
    "S",
    "R",
    "H",
    "D",
    "L",
    "U",
    "C",
    "M",
    "F",
    "Y",
    "W",
    "G",
    "P",
    "B",
    "V",
    "K",
    "X",
    "Q",
    "J",
    "Z",
  ];
  let letterFrequency = [
    1202, 910, 812, 768, 731, 695, 628, 602, 592, 432, 398, 288, 271, 261, 230,
    211, 209, 203, 182, 149, 111, 69, 17, 11, 10, 7,
  ];
  global_letterChoices = "";
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < letterFrequency[i] * 10; j++) {
      global_letterChoices = global_letterChoices + commonLetters[i];
    }
  }
  global_letterChoices = scramble(global_letterChoices);
  return global_letterChoices;
};

module.exports = {
  createManyPuzzles,
  setGlobalOptionValue,
};
