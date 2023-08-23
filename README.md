# @pasciaks/lostwords-org-library

---

# Word search Puzzle Maker

### Function to create square word search puzzle.

Note: This code is from many years ago and just being added to npm and the related Github repository as a way to establish a growing, improved code base.

The goal will be to class base this source code, apply typescript and perhaps adapt the current 'random' algorithm to create the word search data with priorities to include:

- Planned List of Priorities
  - Adapt for other languages.
    - JAVA
    - C#
    - Python
  - Improve algorithm for non random, depth-first-search, flood-fill type algorithm implementations.
  - Establish example web and other applications in variety of frameworks that use this generation library.

---

```bash

# npm install

npm install @pasciaks/lostwords-org-library

```

```javascript
// Javascript usage

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

# Test

To test this code, execute the following in your bash shell or terminal window.

```bash
# test
$npm run test

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
