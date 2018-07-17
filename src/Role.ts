import { CreepController } from 'CreepController';

export abstract class Role {
    protected creepName: string;
    protected creepController: CreepController;
    protected stage: number;
    protected mode: number;
    protected type: RoleType;

    constructor(creep: Creep, mode: number, stage: number, type: RoleType) {
        this.creepController = new CreepController(creep);
        this.creepName = creep.name;
        this.mode = mode;
        this.stage = stage;
        this.type = type;
    }

    public abstract run(): void;
    public abstract save(): RoleMemory;

}

export interface RoleMemory {
    type: RoleType;
    creepName: string;
    stage: number;
    mode: number;
}

export enum RoleType {
    harvester = 0
}

export interface RoleModeBody {
    [level: number]: BodyPartConstant[];
}
