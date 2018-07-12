import {Job} from 'jobs/Job';
import { ASource } from './ASource';
import { AStructureController } from './AStructureController';

export class ARoom {

    private room: Room;
    public controller: AStructureController | undefined;

    constructor(room: Room) {
        this.room = room;
        this.controller = room.controller === undefined ? undefined : new AStructureController(room.controller);
    }

    public findSources(): ASource[] {
        return _.map(this.find(FIND_SOURCES), (s) => new ASource(s));
    }

    public find<K extends FindConstant>(type: K, opts?: FilterOptions<K>): Array<FindTypes[K]> {
        return this.room.find(type, opts);
    }
}
