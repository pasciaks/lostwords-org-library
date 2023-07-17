const {
  createManyPuzzles,
  setGlobalOptionValue,
} = require("@pasciaks/lostwords-org-library");

// setGlobalOptionValue("global_squarePuzzleSize", 8);
// setGlobalOptionValue("global_puzzleshapeoverride", "-".repeat(8 * 8));

setGlobalOptionValue("global_allowWriteToDisk", true);

setGlobalOptionValue("global_title_name", "Puzzle Title");
setGlobalOptionValue("global_p_words", "LOST,WORDS");
setGlobalOptionValue("global_pre_msg", "Good Luck");
setGlobalOptionValue("global_post_msg", "Good Job");

setGlobalOptionValue("global_p_bends", 0);
setGlobalOptionValue("global_diagonals", "yes");
setGlobalOptionValue("global_wordlistoption", "B");
setGlobalOptionValue("global_clueoption", "A");
setGlobalOptionValue("global_blanks", ""); // "", ".", "[WORDLETTERS]"

let result = createManyPuzzles(1);

console.log(result);
