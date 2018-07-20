import { EnergyRole } from 'EnergyRole';
import { RoleMemory, RoleModeBody, RoleType } from 'Role';

export class Miner extends EnergyRole {

    private container: StructureContainer;
    private static levelBodies: RoleModeBody = {
        1: [],
        2: [WORK, WORK, WORK, WORK, WORK, MOVE],
        3: [WORK, WORK, WORK, WORK, WORK, MOVE],
        4: [WORK, WORK, WORK, WORK, WORK, MOVE],
        5: [WORK, WORK, WORK, WORK, WORK, MOVE],
        6: [WORK, WORK, WORK, WORK, WORK, MOVE],
        7: [WORK, WORK, WORK, WORK, WORK, MOVE],
        8: [WORK, WORK, WORK, WORK, WORK, MOVE]
    };

    constructor(
        id: number,
        creepRequested: boolean,
        mode: number,
        stage: number,
        container: StructureContainer,
        creepName?: string
    ) {
        super(id, creepRequested, mode, stage, RoleType.harvester, creepName);
        this.container = container;
    }

    public run(): void {
        if (!this.creepController)
            return;

        if (this.mode === MinerMode.Normal) {
            this.runNormal();
        }
    }

    private runNormal(): void {

    }

    public save(): MinerMemory {
        const roleMem = super.save() as MinerMemory;
        roleMem.containerId = this.container.id;
        return roleMem;
    }

    public static load(memory: MinerMemory): Miner {
        const container = Game.getObjectById(memory.containerId) as StructureContainer;
        return new Miner(
            memory.id,
            memory.creepRequested,
            memory.mode,
            memory.stage,
            container,
            memory.creepName
        );
    }
}

export enum MinerMode {
    Normal = 0
}

export interface MinerMemory extends RoleMemory {
    containerId: string;
}
