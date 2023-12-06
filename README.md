# @pasciaks/lostwords-org-library

---

# Word search Puzzle Maker

### Javascript library/function that will create a SQUARE word search puzzle.

Note: This code is from many years ago and just being added to npm and the related Github repository as a way to establish a growing, improved code base.

## This is a backend NPM Package, using it requires running code using Node.Js (example/instructions at the end of this document)

Note: This library is configured for use as a backend Node.js function to be used server side. I will likely be creating a frontend library/module function in the future.

---

```bash

# npm install

npm install @pasciaks/lostwords-org-library

```

```javascript
// Simple Javascript usage

const { createManyPuzzles } = require("@pasciaks/lostwords-org-library");

let result = createManyPuzzles(1);

console.log("Puzzles:", result);

console.log("Puzzles Created:", result.length);
```

```javascript
// Runkit usage example

let lwl = require("@pasciaks/lostwords-org-library");

console.log(lwl.createManyPuzzles(1));
```

```javascript
// Configurable options for creating a word find with your words, etc.

let lwl = require("@pasciaks/lostwords-org-library");

//--------------------------------------------------------------------
// Use local variables to hold configured settings
//--------------------------------------------------------------------

// Number of rows and columns to build puzzle grid, for example 8
let global_squarePuzzleSize = 8;

// Number of bends in the words for hiding them.

// For example 0 (straight line hides)
// For example 2 (max of 2 bends)
// For example 999 (only 90 degree bends)
let global_p_bends = 0;

// Allow Diagonals - "yes" | "no"
let global_diagonals = "yes";

// Option for word hint generation.

// [A]ny, Randomly chooses one of the following
// [R]eversed,
// [S]crambled,
// [N]o Vowels,
// [F]irst Letter and blanks
// [D]efault shows the word;
let global_wordlistoption = "A";

// String title of the puzzle.
let global_title_name = "Title";

// Letter use/hide option - "U" | ""

// Using a "U" here means don't duplicate use of letters
let global_clueoption = "U";

// Fill in remaining letters of grid with selection given.

// "" - Use random letters from english alphabet in upper case
// "[WORDLETTERS]" - Use random letters from any letters from words hidden
// "1234ADFB" - Use random letters from provided list of letters
let global_blanks = "";

// Comma separated string of words to hide, upper case, no spaces
let global_p_words = "LOST,WORDS,SHELDON,NODE,JAVASCRIPT";

// String for post_msg title
let global_post_msg = "Puzzle Solved";

// String for pre_msg title
let global_pre_msg = "Good Luck";

//--------------------------------------------------------------------
// Set the settings
//--------------------------------------------------------------------

lwl.setGlobalOptionValue("global_squarePuzzleSize", global_squarePuzzleSize);
lwl.setGlobalOptionValue("global_p_bends", global_p_bends);
lwl.setGlobalOptionValue("global_diagonals", global_diagonals);
lwl.setGlobalOptionValue("global_wordlistoption", global_wordlistoption);
lwl.setGlobalOptionValue("global_title_name", global_title_name);
lwl.setGlobalOptionValue("global_clueoption", global_clueoption);
lwl.setGlobalOptionValue("global_blanks", global_blanks);
lwl.setGlobalOptionValue("global_p_words", global_p_words);
lwl.setGlobalOptionValue("global_post_msg", global_post_msg);
lwl.setGlobalOptionValue("global_pre_msg", global_pre_msg);

//--------------------------------------------------------------------
// Create the puzzle data by running the library
//--------------------------------------------------------------------

let result = lwl.createManyPuzzles(1);

console.log(result);
```

```js

The p_data value holds the letters.

These letters can be used to create a square grid.

u c d y e d r n e t s e u t
y t x s r e e e t o e m m d
i r l d a r d o d t y t o n
r d h t r i j h d k S e t d
g s n h s a m p e D h h y y
e o a o t o n h i R a r n s
o k o i i w f m m W O t g h
a r d e t h n r y f u s g r
a e l d s t w r i n a i h t
e d h o r f l a a r t a t w
e w a i s y l l s n o T h a
l t s a t r m h L r S e a h
d n a r e o t r n O u l t s
r s o f n a e a h e o n o n

Puzzles: [
  {
    creator_id: 1,
    id: 1692831655194,
    creation_datetime: 1692831655194,
    title: 'Untitled Puzzle',
    p_pre_msg: 'Good Luck',
    p_post_msg: 'Puzzle Solved',
    p_rows: 14,
    p_cols: 14,
    p_data: 'UCDYEDRNETSEUTYTXSREEETOEMMDIRLDARDODTYTONRDHTRIJHDKSETDGSNHSAMPEDHHYYEOAOTONHIRARNSOKOIIWFMMWOTGHARDETHNRYFUSGRAELDSTWRINAIHTEDHORFLAARTATWEWAISYLLSNOTHALTSATRMHLRSEAHDNAREOTRNOULTSRSOFNAEAHEONON',
    p_bends: 9,
    p_words: [ 'LOST', 'WORDS' ],
    p_locations: [ '9,12,10,13,11,12,12,11', '10,7,11,7,10,6,10,5,11,4' ],
    p_failed: false,
    p_clues: [ 'r_TSOL', 'r_SDROW' ],
    p_wordoptions: 'B',
    p_clueoptions: 'U'
  }
]


```

# -------------------------------- -------------------------------- QUICK-START - EXAMPLE USAGE -------------------------------- --------------------------------

# NOTE: To use this code, generally, follow these instructions.

- Create a folder/directory on your computer.

- Open that directory in the bash terminal/command line.

- Inside the terminal/command line, execute the following:

```bash

npm install @pasciaks/lostwords-org-library

```

- Create a file in the same directory ( example.js )

- Add the following code to the example.js file you created.

```js
const { createManyPuzzles } = require("@pasciaks/lostwords-org-library");

let result = createManyPuzzles(1);

console.log("Puzzles:", result);

console.log("Puzzles Created:", result.length);
```

- Save the .js file and run this example by executing the following in the same terminal.

```bash


node example.js


```

---

# Additional links and examples for reference:

This website demonstrates use of the library. [Demo Website](https://sheldon.pasciak.com/).

This website demonstrates a revised word hiding algorithm. [Word Hiding Example](https://pasciak.com/word-hiding-algo.html).

This website implements a full featured game using the library. [Lostwords.org](http://lostwords.org).

Contribute and support this effort by donating to my cause. [Contribute/Support](https://www.buymeacoffee.com/shelpasc).
