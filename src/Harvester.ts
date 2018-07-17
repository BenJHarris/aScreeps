import { EnergyRole } from 'EnergyRole';
import { RoleMemory, RoleModeBody, RoleType } from 'Role';

const bodyNormal: RoleModeBody = {
    1: [WORK, CARRY, MOVE, MOVE],
    2: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
};

export class Harvester extends EnergyRole {
    private source: Source;

    constructor(creep: Creep, mode: number, stage: number, source: Source) {
        super(creep, mode, stage, RoleType.harvester);
        this.source = source;
    }

    public run(): void {
        // todo
    }

    public static getBodyForMode(mode: HarvesterMode, level: number): BodyPartConstant[] {
        if (mode === HarvesterMode.Normal) {
            return bodyNormal[level];
        } else {
            throw new Error('undefined mode');
        }
    }

    // save and load

    public save(): HarvesterMemory {
        return {
            creepName: this.creepName,
            mode: this.mode,
            source: this.source.id,
            stage: this.stage,
            type: RoleType.harvester
        };
    }

    public static load(memory: HarvesterMemory): Harvester {
        const creep = Game.creeps[memory.creepName];
        const source = Game.getObjectById(memory.source) as Source;
        return new Harvester(creep, memory.mode, memory.stage, source);
    }
}

export enum HarvesterMode {
    Normal
}

export interface HarvesterMemory extends RoleMemory {
    source: string;
}
