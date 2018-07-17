import { Empire } from 'Empire';
import { HomeRoom } from 'HomeRoom';
import { initEmpire } from 'startup';
import { ErrorMapper } from 'utils/ErrorMapper';

// create empire or load from memory
let empire: Empire;
if (Memory.empire === undefined) {
  empire = initEmpire();
} else {
  empire = Empire.load(Memory.empire);
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  empire.run();
  Memory.empire = empire.save();

});
