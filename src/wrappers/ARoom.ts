import { Job } from 'jobs/Job';
import { ARoomPosition } from 'wrappers/ARoomPosition';
import { ASource } from 'wrappers/ASource';
import { AStructure } from 'wrappers/AStructure';
import { AStructureController } from 'wrappers/AStructureController';

export class ARoom {

    private room: Room;
    public name: string;
    public controller: AStructureController | undefined;
    public sources: ASource[];
    public myStructures: AStructure[];
    public harvestPositions: ARoomPosition[];

    constructor(room: Room) {
        this.room = room;
        this.name = room.name;
        this.controller = room.controller === undefined ? undefined : new AStructureController(room.controller);
        this.sources = this.findSources();
        this.myStructures = this.findMyStructures();
        this.harvestPositions = this.findHarvestPositions();
    }

    private findSources(): ASource[] {
        return _.map(this.find(FIND_SOURCES), (s) => new ASource(s));
    }

    private findMyStructures(): AStructure[] {
        return _.map(this.find(FIND_MY_STRUCTURES), (s) => new AStructure(s));
    }

    private findHarvestPositions(): ARoomPosition[] {
        const arr: ARoomPosition[] = [];
        _.forEach(_.map(this.sources, (s) => s.pos.findFreeSpaces(1)), (a) => _.forEach(a, (p) => arr.push(p)));
        return arr;
    }

    public find<K extends FindConstant>(type: K, opts?: FilterOptions<K>): Array<FindTypes[K]> {
        return this.room.find(type, opts);
    }

}
