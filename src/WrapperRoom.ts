import { Dictionary } from "lodash";

export class WrapperRoom {
    private room: Room;
    public structures: Dictionary<Structure[]>;

    constructor(room: Room) {
        this.room = room;
        this.structures = this.findStructures();
    }

    private findStructures(): Dictionary<Structure[]> {
        return _.groupBy(this.room.find(FIND_STRUCTURES) as Structure[], 'structureType');
    }
}
