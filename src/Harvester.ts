import { EnergyRole } from 'EnergyRole';
import { RoleMemory, RoleModeBody, RoleType } from 'Role';

export class Harvester extends EnergyRole {
    private source: Source;

    private static levelBodies: RoleModeBody = {
        1: [WORK, CARRY, MOVE, MOVE],
        2: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    };

    constructor(
        id: number,
        mode: number,
        stage: number,
        source: Source,
        creepName?: string) {

        super(id, mode, stage, RoleType.harvester, creepName);
        this.source = source;
    }

    public run(): void {
        // todo
    }

    public getBody(level: number): BodyPartConstant[] {
        return Harvester.levelBodies[level];
    }

    // save and load

    public save(): HarvesterMemory {
        return {
            id: this.id,
            mode: this.mode,
            source: this.source.id,
            stage: this.stage,
            type: this.type,
            creepName: this.creepName
        };
    }

    public static load(memory: HarvesterMemory): Harvester {
        const source = Game.getObjectById(memory.source) as Source;
        return new Harvester(
            memory.id,
            memory.mode,
            memory.stage,
            source,
            memory.creepName
        );
    }

    public static create(id: number, source: Source) {
        return new Harvester(id, 0, 0, source);
    }
}

export enum HarvesterMode {
    Normal
}

export interface HarvesterMemory extends RoleMemory {
    source: string;
}
