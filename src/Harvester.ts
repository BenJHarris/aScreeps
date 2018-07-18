import { EnergyRole } from 'EnergyRole';
import { RoleMemory, RoleModeBody, RoleType } from 'Role';

export class Harvester extends EnergyRole {
    private source: Source;

    private static levelBodies: RoleModeBody = {
        1: [WORK, CARRY, MOVE, MOVE],
        2: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        5: [WORK, CARRY, MOVE, MOVE]
    };

    constructor(
        id: number,
        creepRequested: boolean,
        mode: number,
        stage: number,
        source: Source,
        creepName?: string) {

        super(id, creepRequested, mode, stage, RoleType.harvester, creepName);
        this.source = source;
    }

    public run(): void {
        if (this.creepController) {
            if (this.mode === HarvesterMode.Normal) {
                if (this.stage === HarvesterStage.MoveToSource) {
                    if (!this.creepController.pos.inRangeTo(this.source, 1)) {
                        this.creepController.moveTo(this.source.pos);
                    } else {
                        this.stage = HarvesterStage.HarvestSource;
                    }
                } else if (this.stage === HarvesterStage.HarvestSource) {
                    if (this.creepController.carry < this.creepController.carryCapacity) {
                        this.creepController.harvest(this.source);
                    } else {
                        this.stage = HarvesterStage.MoveToController;
                    }
                } else if (this.stage === HarvesterStage.MoveToController) {
                    if (!this.creepController.pos.inRangeTo(
                        this.creepController.room.controller as StructureController, 3)) {
                        if (this.creepController.room.controller !== undefined) {
                            this.creepController.moveTo(this.creepController.room.controller.pos);
                        }
                    } else {
                        this.stage = HarvesterStage.UpgradeController;
                    }
                } else if (this.stage === HarvesterStage.UpgradeController) {
                    if (this.creepController.carry > 0) {
                        this.creepController.upgrade(this.creepController.room.controller as StructureController);
                    } else {
                        this.stage = HarvesterStage.MoveToSource;
                    }
                }
            }
        }
    }

    public getBody(level: number): BodyPartConstant[] {
        return Harvester.levelBodies[level];
    }

    // save and load

    public save(): HarvesterMemory {
        return {
            creepName: this.creepName,
            creepRequested: this.creepRequested,
            id: this.id,
            mode: this.mode,
            source: this.source.id,
            stage: this.stage,
            type: this.type
        };
    }

    public static load(memory: HarvesterMemory): Harvester {
        const source = Game.getObjectById(memory.source) as Source;
        return new Harvester(
            memory.id,
            memory.creepRequested,
            memory.mode,
            memory.stage,
            source,
            memory.creepName
        );
    }

    public static create(id: number, source: Source) {
        return new Harvester(id, false, 0, 0, source);
    }
}

export enum HarvesterMode {
    Normal = 0
}

export interface HarvesterMemory extends RoleMemory {
    source: string;
}

export enum HarvesterStage {
    MoveToSource = 0,
    HarvestSource = 1,
    MoveToController = 2,
    UpgradeController = 3
}
