export class Job {
    private id: number;
    private creepName?: string;
    private type: RoleType;
    private mode: RoleMode;
    private stage: number;

    constructor(id: number, type: RoleType, mode: RoleMode, stage: number, creepName?: string) {
        this.id = id;
        this.type = type;
        this.mode = mode;
        this.stage = stage;
        this.creepName = creepName;
    }

    public run(): void {
        if (this.creepName === undefined) return;
        const creep = Game.creeps[this.creepName];
        if (this.type === RoleType.harvester) {
            Harvester.run(this.mode, this.stage);
        } else {
            throw new Error("unknown type");
        }
    }

    public save(): JobMemory {
        return {
            creepName: this.creepName,
            id: this.id
        };
    }

    public static load(jobMemory: JobMemory): Job {
        return new Job(jobMemory.id, jobMemory.creepName);
    }
}

export interface JobMemory {
    id: number;
    creepName?: string;
}

export enum RoleType {
    harvester = 0
}

export enum RoleMode {
    normal = 0
}
