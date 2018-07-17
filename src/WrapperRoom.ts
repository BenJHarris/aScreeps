import { Dictionary } from "lodash";

export class WrapperRoom {
    private room: Room;
    public structures: Dictionary<Structure[]>;
    public name: string;

    constructor(room: Room) {
        this.room = room;
        this.name = room.name;
        this.structures = this.findStructures();
    }

    private findStructures(): Dictionary<Structure[]> {
        return _.groupBy(this.room.find(FIND_STRUCTURES) as Structure[], 'structureType');
    }
}
