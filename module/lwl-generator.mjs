// -- Externally configurable
let global_squarePuzzleSize = 14;
let global_p_bends = 0;
let global_puzzleshapeoverride = "";
let global_diagonals = "yes";
let global_wordlistoption = "A";
let global_title_name = "Puzzle Title";
let global_clueoption = "U";
let global_blanks = "";
let global_p_words = "LOST,WORDS";
let global_post_msg = "Post Message - Puzzle Solved";
let global_pre_msg = "Pre Message - Good Luck";

// -- Internal Use
let global_hidden_words = '';
let global_noDiagonals = false;
let global_must_be_diagonal = false;
let global_puzzleData = "";
let global_letterChoices = "";
let global_p_data = "";
let global_p_locations = "";
let global_wordLetters = "";
let global_shrinkamt = 0;
let global_frect = "9,9,9,9, ";
let global_point = {};
let global_currentPath = [];
let global_locationsArray = [];
let global_foundLocations = [];

export const setGlobalOptionValue = (variable, val) => {
    switch (variable) {
        case "global_squarePuzzleSize":
            global_squarePuzzleSize = val;
            break;
        case "global_p_bends":
            global_p_bends = val;
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
 * arrayDifferences
 *
 * @param {*} array1
 * @param {*} array2
 * @returns
 */
function arrayDifferences(array1, array2) {
    // Check if both inputs are arrays
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        console.log("Both inputs must be arrays.");
        return [array1, array2];
    }

    // Create arrays to hold differences
    const differences1 = [];
    const differences2 = [];

    // Find differences in array1 compared to array2
    for (const element of array1) {
        if (!array2.includes(element)) {
            differences1.push(element);
        }
    }

    // Find differences in array2 compared to array1
    for (const element of array2) {
        if (!array1.includes(element)) {
            differences2.push(element);
        }
    }

    return [differences1, differences2];
}

/**
 * compareArrays
 *
 * @param {*} array1
 * @param {*} array2
 * @returns
 */
function compareArrays(array1, array2) {
    // Check if both inputs are arrays
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        return false;
    }

    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
        return false;
    }

    // Sort the arrays to ensure consistent comparison
    const sortedArray1 = array1.slice().sort();
    const sortedArray2 = array2.slice().sort();

    // Compare each element of the sorted arrays
    for (let i = 0; i < sortedArray1.length; i++) {
        if (sortedArray1[i] !== sortedArray2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * reverseString
 *
 * @param {string} string_value
 * @returns {string || null}
 */
const reverseString = (string_value) => {
    if (!string_value) return null;
    let new_string_value = "";
    for (let i = string_value.length - 1; i >= 0; i--) {
        new_string_value += string_value.charAt(i);
    }
    return new_string_value;
};

/**
 * scramble
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
 * randRange
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
const randRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * shrinkPuzzle
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
            if (getLetter(i, r) === " ") {
                setLetter(i, r, "-"); // "-"
            } else {
                setLetter(i, r, " "); // " "
            }
        }
    }
};

/**
 * createManyPuzzles
 *
 * @param {*} howManyToCreate
 * @returns
 */
export const createManyPuzzles = (howManyToCreate = 1) => {
    let resultsArray = [];

    for (let i = 0; i < howManyToCreate; i++) {
        makeLetterSet();
        let r = createPuzzle();
        let lineText = '';
        for (let jj = 0; jj < global_squarePuzzleSize; jj++) {
            for (let ii = 0; ii < global_squarePuzzleSize; ii++) {
                lineText += getLetter(ii + 1, jj + 1) + " ";
            }
            lineText = '';
        }
        r.p_data = r.p_data.toUpperCase();
        resultsArray.push(r);
    }

    if (resultsArray.length < 1) {
        throw new Error(
            "Failed. Usage: createManyPuzzles(number), where number is an Integer > 0"
        );
    }

    return resultsArray;
};

/**
 * createPuzzle
 *
 * @returns
 */
const createPuzzle = () => {
    global_wordLetters = "";
    global_foundLocations = [];
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

    let wordList = global_p_words.split(",");

    global_hidden_words = global_p_words.split(",");

    let maxBends = global_p_bends;

    let pp = "";

    if (maxBends < 1) {
        pp = global_diagonals;
        global_noDiagonals = pp === "no";
    }

    let howManyHidden = 0;
    let missingWords = "";
    let hiddenWords = "";

    for (let index = 0; index < wordList.length; index++) {
        let result = false;
        let attempts = 0;
        do {
            result = hideWordInPuzzle(maxBends, wordList[index]);
            attempts++;
        } while (result === false && attempts < 6666);

        if (result === false) {
            if (missingWords === "") {
                missingWords += wordList[index] + "";
            } else {
                missingWords += "," + wordList[index] + "";
            }
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

    // global_p_words = hiddenWords;

    fillBlanks(global_blanks);

    global_p_data = global_puzzleData;

    let result2 = createSqlFromFilledform();

    return result2.created;
};

/**
 * hideWordInPuzzle
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
        global_currentPath = [];
        let diags = false;
        global_currentPath = createPath(bends, theWord, diags);
        if (attempts > 500) return false;
        attempts++;
    } while (makePointsFromPath(testX, testY, theWord) === false);

    if (setPointsFromPath(theWord) === false) {
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
    return true;
};

/**
 * makePointsFromPath
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

    if (global_currentPath.length < 1) return false;

    for (let index = 0; index < global_currentPath.length; index++) {
        if (sx < 1) {
            global_locationsArray = [];
            return false;
        }
        if (sx > global_squarePuzzleSize) {
            global_locationsArray = [];
            return false;
        }
        if (sy < 1) {
            global_locationsArray = [];
            return false;
        }
        if (sy > global_squarePuzzleSize) {
            global_locationsArray = [];
            return false;
        }

        sx += global_currentPath[index].dx;
        sy += global_currentPath[index].dy;

        global_point = {};
        global_point.x = sx;
        global_point.y = sy;

        if (findPoint(sx, sy) === true) {
            global_locationsArray = [];
            return false;
        }

        if (getLetter(sx, sy) !== "-") {
            if (global_clueoption === "U") {
                global_locationsArray = [];
                return false;
            } else {
                if (getLetter(sx, sy) !== wordToUse.substring(index, index + 1)) {
                    global_locationsArray = [];
                    return false;
                }
            }
        }

        if (sx < 1) {
            global_locationsArray = [];
            return false;
        }
        if (sx > global_squarePuzzleSize) {
            global_locationsArray = [];
            return false;
        }
        if (sy < 1) {
            global_locationsArray = [];
            return false;
        }
        if (sy > global_squarePuzzleSize) {
            global_locationsArray = [];
            return false;
        }

        global_locationsArray.push(global_point);
    }

    return true;
};

/**
 * setPointsFromPath
 *
 * @param {*} wordToUse
 * @returns
 */
const setPointsFromPath = (wordToUse) => {
    let sx = 0;
    let sy = 0;
    let letter = "";

    for (let ii = 0; ii < global_foundLocations.length; ii++) {
        if (global_foundLocations[ii] === JSON.stringify(global_locationsArray)) {
            return false;
        }
    }

    global_foundLocations.push(JSON.stringify(global_locationsArray));

    for (let index = 0; index < global_locationsArray.length; index++) {
        sx = global_locationsArray[index].x;
        sy = global_locationsArray[index].y;
        letter = wordToUse.substr(index, 1);
        setLetter(sx, sy, letter.toLowerCase());
    }
};

/**
 * findPoint
 *
 * @param {*} valX
 * @param {*} valY
 * @returns
 */
const findPoint = (valX, valY) => {
    for (let index = 0; index < global_locationsArray.length; index++) {
        if (global_locationsArray[index].x === valX) {
            if (global_locationsArray[index].y === valY) {
                return true;
            }
        }
    }

    return false;
};

/**
 * createPath
 *
 * @param {*} maxBends
 * @param {*} wordToUse
 * @returns
 */
const createPath = (maxBends, wordToUse) => {
    let only90DegreeTurns = false;

    if (maxBends === 999) only90DegreeTurns = true;

    let howMany = wordToUse.length;

    global_currentPath = [];

    global_point = {};

    global_point.dx = 0;
    global_point.dy = 0;

    let dx = 0;
    let dy = 0;
    let isDiagonal = false;

    do {
        dx = 2 - randRange(1, 3); // -1, 0, 1
        dy = 2 - randRange(1, 3); // -1, 0, 1
        isDiagonal = dx !== 0 && dy !== 0;
    } while (
        (!isDiagonal && global_must_be_diagonal) ||
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
                        if (Math.abs(dx) === Math.abs(dy)) {
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

        global_point = {};

        global_point.dx = dx;
        global_point.dy = dy;

        global_currentPath.push(global_point);
    } while (index < howMany);

    return global_currentPath;
};

/**
 * createEmptyPuzzleShape
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
 * createEmptyPuzzle
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
 * fillBlanks
 *
 * @param {*} blankCharacters
 */
const fillBlanks = (blankCharacters) => {
    let letter = "";

    if (blankCharacters === "[WORDLETTERS]") {
        blankCharacters = global_wordLetters;
    }

    if (blankCharacters === "") {
        global_letterChoices = "" + makeLetterSet();
    } else {
        global_letterChoices = "" + blankCharacters;
    }

    // fail-safe
    if (!global_letterChoices || global_letterChoices === "") {
        global_letterChoices = "" + makeLetterSet();
    }

    for (let r = 1; r <= global_squarePuzzleSize; r++) {
        for (let c = 1; c <= global_squarePuzzleSize; c++) {
            if (getLetter(c, r) === "-") {
                letter =
                    global_letterChoices[
                        Math.floor(Math.random() * global_letterChoices.length)
                        ];
                setLetter(c, r, letter.toLowerCase());
            }
        }
    }
};

/**
 * getLetter
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
 * setCharAt
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
 *
 * @returns
 */
const createSqlFromFilledform = () => {
    let ArrayOfWords = global_p_words.split(",");

    let ArrayOfClues = [];

    for (let ll = 0; ll < ArrayOfWords.length; ll++) {
        ArrayOfClues.push("");
    }

    let ArrayOfLocations = global_p_locations.split(",");

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

    let randomLetterChoice;

    for (let wl = 0; wl < ArrayOfWords.length; wl++) {
        if (ArrayOfWords[wl]) {
            if (ArrayOfClues[wl] === "") {

                if (global_wordlistoption === 'A') {
                    randomLetterChoice = 'RSNFD';
                    randomLetterChoice = randomLetterChoice[Math.floor(Math.random() * randomLetterChoice.length)];
                } else {
                    randomLetterChoice = global_wordlistoption
                }

                switch (randomLetterChoice) {
                    case 'R':
                        ArrayOfClues[wl] = "r_" + reverseString(ArrayOfWords[wl]);
                        break;
                    case 'S':
                        ArrayOfClues[wl] = "s_" + scramble(ArrayOfWords[wl]);
                        break;
                    case 'N':
                        ArrayOfClues[wl] = "n_" + ArrayOfWords[wl].replace(/[aeiouAEIOU]/g, '');
                        break;
                    case 'F':
                        ArrayOfClues[wl] = "f_" + ArrayOfWords[wl][0] + '-'.repeat(ArrayOfWords[wl].length - 1);
                        break;
                    default:
                        ArrayOfClues[wl] = "d_" + ArrayOfWords[wl];
                        break;
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
    let locarr = [];
    let coordsPair = '"';
    let coordLength = ArrayOfWords.length;

    let hasFailed = false;

    for (let wl = 0; wl < ArrayOfWords.length; wl++) {
        let wordLength = ArrayOfWords[wl].length;
        coordsPair = "";
        hasFailed = false;
        for (let ii = 0; ii < wordLength; ii++) {
            coordsPair += ArrayOfLocations[coordsIndex];

            if (ArrayOfLocations[coordsIndex] === undefined) {
                hasFailed = true;
            }
            coordsIndex++;
            coordsPair += "," + ArrayOfLocations[coordsIndex];

            if (ArrayOfLocations[coordsIndex] === undefined) {
                hasFailed = true;
            }
            coordsIndex++;
            if (ii < wordLength - 1) coordsPair += ",";
        }

        if (!hasFailed) {
            locarr.push(coordsPair);
        }

        coordsPair += '"' + coordsPair + '"';

        locationsString += coordsPair;

        if (wl < coordLength - 1) locationsString += ",";
    }

    let PuzzleName = global_title_name;

    if (PuzzleName === "") PuzzleName = "Untitled Puzzle";

    if (compareArrays(ArrayOfWords, global_hidden_words)) {
    } else {
        hasFailed = true;
        console.log(arrayDifferences(ArrayOfWords, global_hidden_words));
    }

    let createdPuzzleObject = {};
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
    createdPuzzleObject.p_failed = hasFailed;
    createdPuzzleObject.p_clues = ArrayOfClues;
    createdPuzzleObject.p_wordoptions = global_wordlistoption;
    createdPuzzleObject.p_clueoptions = global_clueoption;

    return {created: createdPuzzleObject};
};

/**
 * makeLetterSet
 *
 * @returns
 */
const makeLetterSet = () => {
    // note: Optimizing by returning the already generated list of letters/frequency table is an enormous speed increase
    global_letterChoices =
        "HNHIGOWAEYCAEAPLLRCENRLASHEKHTTYPEERNGKNVWTOAECITEYTNARLCENOREDYTEODCIRHSUEWEVOYNNTLASHCOYHYHMHSKNHFPBSONOTCEARECAISATWNSWFENFRDARHTXHSWTUITUKIPTAITTPHTGDINAUNOEIESSSRSOEATTGSAVYAUSTRKWHLADNHIPHBUTDSOKIGHECWDTARHOIATSHDYHOFLEVNMZRNSVIEIHQEVUEFFFAAHDAMTDMLTHAOITSAMLSATWHUSIPIMNBNIALOETDUTMPHIOEEEUGAEAFUTENABERELTOTETREACRAYFVALTYLAIVAHISIATTSUPOMDUMDYFOPDAHEEHRNNAESSSHITENPFYROAERGAMOIEEIVDDRIVRTNHEOHAUADHGSEGSHEPETOLULENCBEIEUUAIANLRELADNRTTLOVTLETBEOTDENTLDGLNBIVIHWITEYHCTYOGATFLOMHOOETAODARABENEITSTDACHNACADAEOODDMNECYTRDATAGTDSEOBIMNLNHAFHGTHNRCOASINHLOOOUSYTERCASHTHHAHISELSPWNEBGKSINFDANIAPUEYIHTLOEWIOIHWTBUAMAHPCRIESLINFANPHANFDNHWEMNWRKOARGEOAHMAEMSIENTIIENHEURUOGNSEOTRRUTCMLDHSSEHIECMMOETTOICMITAAYNHILYELAHOHWNTDINCOAONNCVSACRWNHISACRCNHHIMINPSIMEGASCASHIMLNEUARNTRLHDITSHNFEFFNEATHEEORESVSHFTNENEEGNHSFISECEREAAIEUAHAWTIUCOWEDHITCWALYHSATRHEHRSSSLRDHNTCENEHUDSROTTSDNAANOOOLARSIIYAEORIRISEVRYDACTSIRNENNITHTTAEOOIEEEEISIMECELDLYLDOIETNBTDYASIELEEWYATCODABFITHBFTNCEOTNIUTERMLPOODADESSSTSNTARALELHORINOUOBOEOIARHPNCUURHTIFAHOIOHGPODRRRTUOLWARNMFIWNBNEYHIOIRTOHYNIBELVBEEOKRIRNALENILEDODTTEDNSMHHCRYOEHSHDHAHTGYDVDUHRPNUELTPHTASEAIMFGOSENEONWONURIRPHTLHDEMRAEFTNNLAEMHAFEWAELINSUPVOTIUILEEFNPHVSIOAABCGNLOMREEIYMESAFPWNINHOAWEEITMIUEWDENTSOEEELTNOUHRRTATHTDSWEANDRENAERIUIVIGUURDOURNTTTLLRYOTNIEOIHAHIRKUYATCAHATEYYEFMDWENDFEIAYUYOSITICESAHYTAAAEOTLYFBNGHANTEAHOAOAHNCLEIARMSSIEOENMUNFEKMEEIATTOSESHHRARESASYGSEEMINTEINHMPLOYBOALVEHEECFTTMOSEAOTTINPIERCDMUAOAEDSBAEDRFVETTTEFELNGHLEGAFLEMANONWYTLODIDRFYKNSDTCGIEYHVNUITORKDICFWETTTBYUIREPTRRIYUECDIDMMTGHOHEEEOMREWNPTOHHNLBRHYTEHEATTEWLSISOOEOHMRHSHDINTBAPGORTNOTHNSENHENFSNTPDLEOEMRYNMOTAEVAEMWPRLGBTTLESRTRBIESDEVAWSDKUAIINFUOCAAYNORWICRSIOSAVAWUCCLEESEIWDTDOMHTLOONNALCENHYONRUIOGTHRTNYEECSIGDOHOUWWTHOANDEOTVTSDAACNNTRIORFOEUDOOSAAESSWRSYERSNIMLIDNBRINDIUTMNCENEISONNEEGOMRGEAYINVODMTEURTESFEPERNUTEUENEOARTEOTNIAEEIEITGPALSNUAEPOALOMEOTSRIEEDOAOACDHPUOROFIIBKDNOPGAINDATEBSAKONYNTATHTIXRIAWOLLERCLRTNNNEEETDNFTWUOIGLIROIEFLOEIONPPOAASTDAOKOBCCSOIFSSAEEOENNIDCALCGHLAMIATPITOAFDFSOERTESUVHYYUIEABTROIGLENOADAHATTREEGANBEFREMIRFERHTVRNOYDRENCLHLTIIOEISYOSRAENNRDLWEHSARSLLRWEALGEWOTALBHYAATCOYSUEDFRSNETEDUWLMEISEWTAAILURWUTENORRAEOOSAOTSTIRSDEDHETHOEHNMAPEAPRTOHNEMTUHHSEFPDIMDNMHTUTWCAHLIUIEIDSOILETORSEIFTNAEBOQRGINEMNADPLIKCALDCERIRVNHOFSCNPLTRDEYTLOIUANIRTTRTEEEEEEEIRDNTKCANTSSDNTYERRESHOMVLETERYROEAEIWLMHSOUSKEILHUNNILKMPAODGEMSDBOOWCAREENAOYNANUCMSNTBTCFINTOELSNARETBDVHERMHMPECAPSDLKDUOEIESOUAEILOYTROTEIIDDNTIEZSNSEHESTDCCLTSWCTETTEYWRSIDTIUPOBRARYREEAELEIDIIAYOEOSEOMIEOAIUHDETEVHDHTGRSPTLATRESSHWEDKEEFEDITDEIKSNAINSSETEHNESLLLTHNSTAAWIOSHTEEOSLEGTTIHULGENEAAIOEAISGHNEAEMFINISDEOISVBSTSUGSEHNITMAOXSRTAHOGBAASENECGWDTSVCUOHNLAGHMONLTEWUIFTLDAOLEHOEHNNLALHPWEIOEAERTEANEIRHNAEOROTNYEELHPIIIPLLELFSLHRHEOPTAPPWTRTOHSIATTECETOTEIHHSENKYPIATXNVIDDRELRROSNLOTLANTHTTNOLSINWTUHMLGIDSOVITLMNOUDAAOAASDETLALEHXICDSRAACTGSOLNSANTELRNALURRMNWNSOTLSIACIFATACEUNCGHNADNBDSRINSSNEAIOVMHRRILEOEOAISEEOOINUTSALGSVNMHDODHEONSCRRUIOANTELNWELFOCEAOZRTIHUIDDHAWGTAMRORFETASIAHNTEEGEHTNHIONCETIESDHMPGFIONACNFITTBAHOGTIHSRGRBETCAMOOILAIDLGTIOTEIOAFTOEVSRSECNTAENWOIHGMORWENITSANHTHHIOEDISTSCDLNTEECEADAFIVAECOGEDNSMGEFSNPAOEHREHECGILNASSWGRNTISHRDEDAEONTECALOIOHDTMSNESETRGWHPHFSRRLTEGSSIIVITUETOTIACHAYHUSFFAFIDEIOTUYIYTWETGEGAWIALRARLRAMTNTMUEYEDNOLYSGQSASHUONYGAAEOENOFTTTDTIWGAHDSIETBOOAYSLHIDWTWDEDOVHAUNIOTGWNDLBMREPTNECIYARBNTUIEEEEERRSNOBGAYSEEESDETSUTHNDODRNGEIWUSCAOSNEHEUACEHREIERHTLWAOCEGREEDIERTPMWHHCGEUIENNARIHRYSRHAUONENHILNHWMEIPMRLPOTDIULHSNAIAEOEEGHSAOMRASIAOYOTYWTEMESTSIOARTTCNTLTAGEETERFOEHTEMIMSACDAODHHEMURNARADOSOTAENYITOAWIEHEOEOTEROSMDETMFWMENCITDEMSAHWAAEAUNOINUUESHFDIIRMHUEYHESTAEBEEHERBWCDALETTSMREMCAOIOFAOOBTTELTPTAERYTDAILTSDEBHLSTIYRWNDGLGKANPSTCHALETENMRVTGMINAYEINHARWKSYSAIHIAAUUZAIETHTLGVNAEGSONETSDGPIYAMDHNHGTLRDTTEFTEDNOWOHIFHEETHOKNISTDLAEWEEYULHFWOOMEDEUPTWENYENANTIUTNSTAIISTBEFFIBTIPOVORDTPNEULAHHACRRNELYAISEALPOAITEMIHNATAOLBNNGRSCMIITWLTESASLBEERSIDLLAWRSRTKYUYTHHOIAATEHILPASREIRRBOCDCHTEONBIHHEYAAMDRASORAUAFYRINTEUIEVRSVAHUIATTTHXNTIRSDELEYOTSINLCHHSCGRIYRTRORBERIXIMRTHSINSSGATPYISITEBENLOOREIIWDANBSHLENUHESICGEVYHEIWTTNSTOHETATETTNRFNRABWEAIWONIEORORTYTRURHAOHOLEEPFSAOTTEBIHEUAEUEOXYYESRRPAGARBTITHWTEEEDTEERRUNIYIIMAEALIRLCRGVHSWHOHNCRMAVYITLNMTIAETSTROEROEACPMLURTTEENOSRSNHDWELHSEBEASNRETSTTRONNNNNOAORLHDDCPOTRARBHIHTVMNNKSDROLIAOOCEESNEROIETDEUTMEEOEHTTWDREMRSOHESHEERKOSTTRPOIESGSRGGAYTNOAAEERRRTSGOIEHDRSNIAUNOTIDSZLSIELHNININFGTMEAERRHOWILEOAOCWUGEEONOLIRDMTENBOXCTEPSEAGFOTTYUALCSDLNUIATPRWCASEHAVHFCDOFXIIEORWACMTHPFHNNTAACHLSPDSHSOVCERNARGYTHEEPOORTFTEEEHENIEEHFOEGEESHAEONAEELTRACELTALOOLNBHTRHOEERMEUNRHELILTNRYDFEIBEIMDRTAUAEHTAOECTSSOIEHRREDEEMREHATCRWEDVRLMGOMATPMIHFPNOSNAQTTOEOHFLTBHIEFDDSRTAEKNUCQKNFNIYEEOROIGMTECOCEURIROATOTTNNALUPEGTTUUANTADIOLAASITIBTTSEEAEAUAFRHDIHSAEDSEEORLHINENSCHREAIHFNNMIRSIRHICGTDESTFMNHLMARNSOLIEEICECCVTDTHTHSATEULSEOYKHAATCOTEFTAHUAINREENSEIFSGYTDAAFRSMIAAELNHDGTCHEASIHNTFIAEYTEDMHEBEEHUHATTNYRCHOLSENCOFEYOSWUEOGYOANTTIFDEUOOXHIHHANKIYRDHAIVOUARSEWTGIRNEENHGSKWIYEINCIANTEHSTTETEOAEASMNBODOITUEEIOTITTCRTAEEHTERPGOFNDGOAVRIIWLTOSMHEEDVFSTETDIFANNUNETNOHEHUENIAYMVTOGNBTONEATNRGOLUTIAOEHRSONDMSOGHSEDIAUCIDEBUTBJIAATNANTTILSCRAEFENCTTNVOEIEHNEDFAOUERIESABTCTNBSETEAATIINNCOADNDOENPFANHEIEAEPLEGISIORWEAAIAODOTESPLWSONIYNTNLVESSMNUOJLBTTTVMRRWGEALEHSADTAAMIANSBSUEONMGBUNIENDSITLHHHAAAINVPRENYIALYFOHOYSSSALAERRRCAIEEEAIFDCNOSEGOREHEYOIICOBVRAVMSCROEOHICOLSEOTAHAHEYITLNRLALNCOREOOIIYNOGWILEAEADINGLTESDEDXNISNTESHONESSNEAIAENNNGOUDLGETUSYTAGWKKSLNIERMNNNITRHTDISFINDPTAAELASOUUMBIRITIESRIOOMSHEIIOALDRDSUGADOELIRESWMNOSHEIRNVTAFHTAHOOOOOEEDSEHTAHOESMHNDESNIILICSDHTEYMAUOWNEOECENECISHETLASOSRHEHOPSEOIRFIEUTYRHEIAHTINETPANSTBLSMHTRITINTEOEADSDEXANFVNDYOIEDNPPITNYLMEASTWYEGUNHAEOEBNNRIKEDANOSTETSTEGSNTHIEDMIEUIHPYISHEUEABHRSHTSHESAWPNTHGEOURTDETATSANSETCYEOMLTACTSNOSREETHVRMFTLPSLPOUFHNEUESNADHHWDAVLENIDNONDCUEJDHIMNCDADCSSTHADEBRWSOYHIECRLDDERDTNWNULDEZLVITRJIEAITMTTISSAAOAVTNBAEHHIEENELNEDTDILTLDRREOTOKAOARAAUEANRBIGATLESOALRTJEAISAYIMDITUDDDGSRLBSVBEOOUENOEEHKLRPAREWFNEREPIOELOMOEWRFNSLMHIOEORTBELEDNOTWEHDAFFONDTSNEEIFRHTEIIETANFEPSCSOYOUAESOANETMRBCRRATNFRTSTSFWOWTOHRHRIOREAHASFDAHOVRESANHEEHENOMYISNEHSNCIECPUUOEDOUEIASIHNEFULLHREDERDESDHUBDOLDENYYVAROERABRGAENTASTUDTLIBCIOSNGMTATLAHBIVNPHTEADATDEDNRIEEEDMINIUTTRAVOAHRCOHSRHOTNOETNEHFMTOLRIOHUSACWYHFWYHMGMWRNAIANERROTONCFUHEMBOAIOEYDANUAYSLTOBEAMHTOVHNOPPAIEOOTIAIAROVMFLWIDTGTTHHSVTINATRTRLSRDGGRAITNPELUFTWESHALNMOETASTSSLAHNPPDTDBTUISTERIETCDALNINTIOCYNLGPLEETALRLSSAHYENNENUATTEADELLAENEOETYNFYGPNTEDTRWDOSWLDPDTOFSRTUDYBTAVIELOSEHLMTGOBESINERESTRAUEMRTTEOLTEEMEHOUPIEAAENHEEASGRNUMRENEOASLETLOHOBLETRDVBCLPGSWEAOSOHACTNAAAOCDLOONRPFEIIWCPHIMSROCSVUANEUOHMEISICHAATYEOVLIORPTROHMETETNTGIIENEANEOHTAISBEOEEEHTETWPBSRDCENAAFUDRLRTYRNTITULOOHEHATNTIETYTTVWSCDRAAHCYCFGIDIESSONOTASAOIJARCYOWEIMSSYGETTEWSDLAFVRNWAWEPEDTFQURIIOGWAANDNHWOHHOSLEQNWAOMOASDFOTONTHTNDSMETLTRSSNETNDWOOKOTPUEIHDEKNLKUAEARWHDRRATHEONALHTCNHLLRNHRLVIYVUIAWOEDIAOIUKAOTHDUOUSNIWMEOMTTLIAYBNHREASJFMKEDALKIROETULNGKYALIIEOILODNITRETMRFCOTCDETHMIRETONGGYTLSECORIAIHTITHDLHNEEAEHOYSTEEFDTSIINSTRMTUIEDSFOEEPILWHITAAOWENFATOFBCURFHREHITUACAOARLPTDRTDOEOSTCWTNEHOTNHGOOAEEATOEHEHRMTARETPUTPEEYHEHTEAOAIRHOKTNEETLIOTNYOUNEREIKTOUURALAMUSLSDHEATTHRESEATEDARERSELSORTEVNIAONEDREIEEOEEHHNSLLTOEIWIHORECSLPWTEETDTLDALHINMRUONONNMNLAHTSFOCLYTAOEENIAVMRDORNIALMLADDODORFHIBGSARRHGDBOTTHENEFTEITTLAWTAAEOEMNOEEBIEFNNXOPRAOTNSHLIRIIFHOHOCHIAHYRTESHOOIDESTTOSNOSCIOLFRCTISTPIRERTEENAYIOMHOSOATLIARWSASDOEHIAYUITROHDAPOATSHECEEWHTITOPITOUCTRTFTNRETOSROSRTSYARHRWHSSODLLBCEASTTWEEYBRMTBCHIINRTTATOASONASDOOUEGUNBRAPTATHNAESLECTOSHTOESNDTEYRPEVYOLMEIWFASDIAESRGDSEEEFUPRFGMHSDTWPDERRSMNEULYERNHILWNOIAOHSILENRCVIFICWSIEEHONOUANAASREASKNTNIDKBBUODRIVDETEOATEIDMTFGTIATMATNHLIIFEYSERECHOMTLHLEMHBMOARFUNIOMTYORAOLEOITRPMSTNOHAHEEOAOAALAUMTNGDTFHDENORERLVGSEMUTUATISLETTFHHTEISEITCDSTFCSUENOOCTDFPBMUFOEORNSFCTAMWNLONPLIGSLLENEIYOOHESCEEAGDAREHIIOHEERHLENOOYOROEIVTDTSGOINYEALMFWUDHLTIAJONSOTETPCUDODHTITTSGOINSHNDISOOBAECBQTRGTAIOIAWIHTOEHOCLAEOSSAANFHADSNPOHOIPSASREGLSFPOIRCBETUNTARISOVNOEOSOLHTEONIROAEUUNATIMZAIIOBTTSESOOEMMKHMIEEPTBAGSTABUURANCEEESEAHOREACNNNPMWESAAAROINLIETLEEIVATCSEOASROROETONIATONTVCBENNOTEVOSETGTSUUEYWIILIEBHFELFNESFTTKCFHTIITOFHHLTODIERDSNDSETHLPMIIWUTNRHFBNENATIEAUTFTCOORDAFTETHACVODTMARTGHTWDIRMFIADITIETBHTREATEPIHYOECTHOTRDEHSVGOIMHOOGMNSMEFACOSCWNLPTNISTECEDDITREEREFSNKERODVNRDIOOUFNHNFNOMBWHHUTEUEWENDTTNWNFNEFTATTOSRMAORAYRWSHLTTTBAFSDITIEHTMEESREHLRHOWDDRPSGSRLPOYCMFOPEBSMOTSENPLDISRAAIOEWMHMOELFPAATRDOIHLOIRATNCTAPIDRTBINFWNTSKUEPHEOWISMAEEINPWSTTLYDIHPAAAYGEIHONLNAMSIAOIHQLFCUNGNHNHKKIHOGDRUBSYTUYONAAHASERORUTEONDTAAHOSORADRRAOASYREOSITECSHNEHAESEESOTTEIWEHAACPTDGAUTETSETIRAEHTEINFEWENETATUUNARIGBDOEFGTSAFHEOITAAGUTMIEOEFSKOALTRINOTFDRENNELEBHYTSSECNYOMEEWIASNTTSRRNRAWCLUIAOETUDLDROTOTOITOTNEENHAIVELDTBECEEDYIIUNUYTULIDSWYECTSOHRFICRIFYDWGAAURHEEELPDHDVSTATEATDAHNVVOTHLCSEUOSOTEOATHSAPGSENBOMNRASNIREDCAOTROCAFGNRDEBAUODAMEAYRENHNDAIHITOSCWFICREMTNKEHSTTGTIFRTTSFNGFTAAANNSANELLARSMAIPCUEDGSENSSHSSLUEWENAHDNEGERAAASADDSHDTISLRARLOAIEEEMOHAAOEAEIRATONIRERETNTCEISNOSTDPRNNGOITAEFRIOOEAANFWAANETSNTEIGOELEAEKWTACSSNEYHRAFGYAMIHUONHEWOTEIOOIRSRRMCTNBWIRSIGGTWOTFSRIFOIAOHATKSLHNDEOQOIINTINREMSOYFNAOCITRTEAENFPOILSOIRGCUTNNRAIHHMTROHENRSNNSOPDCSUCOSIDADISEATPTAOVITTXLMDSORNMIEHIOROONDKIRPPTDJEEOXIRULHPPDUEIHPTAUCOIETNGIQWOEROYMLFRCLHETREMDRSREONHUATDLYNELLWYNNWOUTIPRAYGTEANEATNWTNXPACSUERRRENFSLMSIERNSOATIEAECHCHOIDEOTLNREADAAUBEASFMOYFCOTNIITAOMDAEOFEADAURSWIIEUDNOILDDANKYFTRNNDYTTEDTITSCELIHETATODPEEDDYRAGSCSOYHWEIDEIIECSDERDGRTTHETKLIOTIRISLLHHNDTOLMNDCINFERAOAFWENYGERSNHYERURCIDUIEUEAEEESULDICRBIPDGFCICLDPNTWGWLOTNROULHSHSERANDRHYEDHPOEDDTMUHTAEWODDBNRDLGISKHVHFHSMSWISDSCBUUURANSADTTCNEESNTTHNVHINHRPCEOSIROEIYFAUEMMEIHINHRLESFICTTSOWSRRHSVAEIYCIRDIHRHKNREEANCOUTGURHMEFKMRKEPFSSMTWHWOEITWISMAADGMOSEBRDETLUOCHHEOPRTTRIUPMIMTHAASRHSYAHTUNHHOTATNOSAOREORFSEIOHFYNTBIIMNSHSAHEEGETLAICPWESUTABFNPEHIERRCSTEGNIIISUSTINEDLEBHATSWORENSPCCEOREJABLERTUOTNS";

    return global_letterChoices;

};


