import { HomeRoomMemory } from 'HomeRoom';
import { Dictionary } from 'lodash';
import { OwnableRoom } from 'OwnableRoom';

export class HomeRoom extends OwnableRoom {

    private roomName: string;
    public effectiveLevel: number;
    public myStructures: Dictionary<Structure[]>;
    public availableSpawns: StructureSpawn[];

    constructor(room: Room) {
        super(room);
        this.roomName = room.name;
        this.myStructures = this.findMyStructures();
        this.effectiveLevel = this.calcEffectiveLevel();
        this.availableSpawns = this.findAvailableSpawns();
    }

    /**
     * get effective level determined by number of extensions
     */
    private calcEffectiveLevel(): number {
        const diff = this.myStructures[STRUCTURE_EXTENSION].length ===
            CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][this.level] ? 0 : 1;
        return this.level - diff;
    }

    /**
     * get dictionary of my structures in room - indexed by structure type
     */
    private findMyStructures(): Dictionary<Structure[]> {
        const dict: Dictionary<Structure[]> = {};
        _.forEach(this.structures, (value, key) => {
            if (key) {
                dict[key] = _.filter(value, (v) => {
                    if (v instanceof OwnedStructure) {
                        return v.my;
                    } else {
                        return false;
                    }
                });
            }
        });
        return dict;
    }

    private findAvailableSpawns(): StructureSpawn[] {
        return _.filter(this.structures[STRUCTURE_SPAWN] as StructureSpawn[], (s) => {
            return !s.spawning;
        });
    }

    // save and load

    public refresh(): HomeRoom {
        const room = Game.rooms[this.roomName];
        return new HomeRoom(room);
    }

    public save(): HomeRoomMemory {
        return {
            roomName: this.roomName
        };
    }

    public static load(homeRoomMemory: HomeRoomMemory): HomeRoom {
        const room = Game.rooms[homeRoomMemory.roomName];
        return new HomeRoom(room);
    }

}

export interface HomeRoomMemory {
    roomName: string;
}
