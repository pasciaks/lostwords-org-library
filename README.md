# @pasciaks/lostwords-org-library

---

# Word search Puzzle Maker

### Function to create square word search puzzle.

Note: This code is from many years ago and just being added to npm and the related Github repository as a way to establish a growing, improved code base.

The goal will be to class base this source code, apply typescript and perhaps adapt the current 'random' algorithm to create the word search data with priorities to include:

- adapt for other languages
  - JAVA
  - C#
  - etc
- improve algorithm for non random, depth-first-search type implementation
- establish example web and other applications in variety of frameworks that use the library

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

```

This website was the source for this library. [Lostwords.org](http://lostwords.org).
