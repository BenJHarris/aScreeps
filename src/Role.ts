import { CreepController } from 'CreepController';

export abstract class Role {
    public id: number;
    protected stage: number;
    protected mode: number;
    protected type: RoleType;
    protected creepName?: string;
    protected creepController?: CreepController;
    protected creep?: Creep;

    constructor(id: number, mode: number, stage: number, type: RoleType, creepName?: string) {
        if (creepName !== undefined && Game.creeps[creepName] !== undefined) {
            this.creep = Game.creeps[creepName];
            this.creepName = creepName;
            this.creepController = new CreepController(Game.creeps[creepName]);
        }
        this.id = id;
        this.mode = mode;
        this.stage = stage;
        this.type = type;
    }

    public hasCreep(): boolean {
        return this.creep !== undefined;
    }

    public abstract getBody(level: number): BodyPartConstant[];
    public abstract run(): void;
    public abstract save(): RoleMemory;

}

export interface RoleMemory {
    id: number;
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
