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


  const spawn = Game.spawns['Spawn1'];
  spawn.spawnCreep([MOVE, WORK, CARRY], 'c1', {memory: {
    'role': 'harvester'
  }});

  const creep = Game.creeps['c1'];
  const source = creep.room.find(FIND_SOURCES)[0];

  if (creep.carry.energy < creep.carryCapacity) {
    if (creep.pos.inRangeTo(source, 1)) {
      creep.harvest(source);
    } else {
      creep.moveTo(source);
    }
  } else {
    if (creep.pos.inRangeTo(spawn, 1)) {
      creep.transfer(spawn, RESOURCE_ENERGY);
    } else {
      creep.moveTo(spawn);
    }
  }

});
