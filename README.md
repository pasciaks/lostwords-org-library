# @pasciaks/lostwords-org-library

---

# Word search Puzzle Maker

### Javascript library/function that will create a SQUARE word search puzzle.

Note: This code is from many years ago and just being added to npm and the related Github repository as a way to establish a growing, improved code base.

The goal might be to Class base this source code, apply typescript and perhaps adapt the current 'random' algorithm to create the word search data for use with other programming languages as well as improved algorithms. Additionally, efforts may include creating example applications/websites that make use of the library.

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

let lostwordsOrgLibrary = require("@pasciaks/lostwords-org-library");

console.log(lostwordsOrgLibrary.createManyPuzzles(1));
```

```javascript
// Configurable options for creating a word find with your words, etc.

let lwl = require("@pasciaks/lostwords-org-library");

//--------------------------------------------------------------------
// Possible use local variables to hold configured settings
//--------------------------------------------------------------------

// Number of rows and columns to build puzzle grid, for example 8
let g_squarePuzzleSize = 8;

// Number of bends in the words while hiding, for example 0 (straight line hides)
let g_p_bends = 0;

// Allow Diagonals - "yes" | "no"
let g_diagonals = "yes";

// [A]ny, Randomly chooses one of the following
// [R]eversed,
// [S]crambled,
// [N]o Vowels,
// [F]irst Letter and blanks
// [D]efault shows the word;
let g_wordlistoption = "A";

// String title of the puzzle
let g_title_name = "Title";

// Hide Option - "U" | "" Using a U here means don't allow duplicating use of letters;
let g_clueoption = "U";

// Fill in remaining letters of grid with selection given.
// "" - Use random letters from english alphabet upper case
// "[WORDLETTERS]" - Use random letters from any letters from words hidden
// "1234ADFB" - Use random letters from provided list of letters
let g_blanks = "";

// Comma separated string of words to hide, upper case, no spaces
let g_p_words = "LOST,WORDS,SHELDON,NODE,JAVASCRIPT";

// String for post_msg title
let g_post_msg = "Puzzle Solved";

// String for pre_msg title
let g_pre_msg = "Good Luck";

//--------------------------------------------------------------------
// Set the settings
//--------------------------------------------------------------------

lwl.setGlobalOptionValue("g_squarePuzzleSize", g_squarePuzzleSize);
lwl.setGlobalOptionValue("g_p_bends", g_p_bends);
lwl.setGlobalOptionValue("g_diagonals", g_diagonals);
lwl.setGlobalOptionValue("g_wordlistoption", g_wordlistoption);
lwl.setGlobalOptionValue("g_title_name", g_title_name);
lwl.setGlobalOptionValue("g_clueoption", g_clueoption);
lwl.setGlobalOptionValue("g_blanks", g_blanks);
lwl.setGlobalOptionValue("g_p_words", g_p_words);
lwl.setGlobalOptionValue("g_post_msg", g_post_msg);
lwl.setGlobalOptionValue("g_pre_msg", g_pre_msg);

//--------------------------------------------------------------------
// Create the puzzle data by running the library
//--------------------------------------------------------------------

let result = lwl.createManyPuzzles(1);

console.log(result);
```

# Test

To test this code, execute the following in your bash shell or terminal window.

```bash
# test
$npm run test
```

```

It appears that all words were hidden.

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

Puzzles Created: 1

```

This website was the source for this library. [Lostwords.org](http://lostwords.org).

Contribute and support this effort by donating to my cause. [Contribute/Support](https://www.buymeacoffee.com/shelpasc).
