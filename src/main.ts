import { ErrorMapper } from "utils/ErrorMapper";
import { HomeRoom } from "HomeRoom";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const roomName = 'W58S58';
  const room = Game.rooms[roomName];

  const homeRoom = new HomeRoom(room);
  _.forEach(homeRoom.myStructures, (s) => console.log(s));
});
