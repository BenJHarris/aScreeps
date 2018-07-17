import { Harvester } from 'Harvester';
import { Logger } from 'Logger';

export class Job {
    private id: number;
    private creepName?: string;
    private type: RoleType;
    private mode: number;
    private stage: number;

    constructor(id: number, type: RoleType, mode: number, stage: number, creepName?: string) {
        this.id = id;
        this.type = type;
        this.mode = mode;
        this.stage = stage;
        this.creepName = creepName;
    }

    public run(): void {
        if (this.creepName === undefined) return;
        const creep = Game.creeps[this.creepName];
        if (creep === undefined) return;
        if (this.type === RoleType.harvester) {
            Harvester.run(creep, this.mode, this.stage);
        } else {
            Logger.log(`Job ${this.id} has an undefined state`, 3);
        }
    }

    public save(): JobMemory {
        return {
            id: this.id,
            type: this.type,
            mode: this.mode,
            stage: this.stage,
            creepName: this.creepName
        };
    }

    public static load(jobMemory: JobMemory): Job {
        return new Job(jobMemory.id,
            jobMemory.type,
            jobMemory.mode,
            jobMemory.stage,
            jobMemory.creepName);
    }
}

export interface JobMemory {
    id: number;
    type: RoleType;
    mode: number;
    stage: number;
    creepName?: string;
}

export enum RoleType {
    harvester
}
