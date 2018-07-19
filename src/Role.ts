import { CreepController } from 'CreepController';

export abstract class Role {
    public id: number;
    public creepRequested: boolean;
    protected stage: number;
    protected mode: number;
    protected type: RoleType;
    protected creepName?: string;
    protected creepController?: CreepController;

    constructor(id: number, creepRequested: boolean, mode: number, stage: number, type: RoleType, creepName?: string) {
        if (creepName !== undefined && Game.creeps[creepName] !== undefined) {
            this.creepName = creepName;
            this.creepController = new CreepController(creepName);
        }
        this.id = id;
        this.creepRequested = creepRequested;
        this.mode = mode;
        this.stage = stage;
        this.type = type;
    }

    public hasCreep(): boolean {
        return this.creepName !== undefined;
    }

    public setCreep(creepName: string) {
        this.creepName = creepName;
        this.creepController = new CreepController(creepName);
    }

    public abstract getBody(level: number): BodyPartConstant[];
    public abstract run(): void;
    public abstract save(): RoleMemory;

}

export interface RoleMemory {
    id: number;
    creepRequested: boolean;
    type: RoleType;
    creepName?: string;
    stage: number;
    mode: number;
}

export enum RoleType {
    harvester = 'harvester'
}

export interface RoleModeBody {
    [level: number]: BodyPartConstant[];
}
