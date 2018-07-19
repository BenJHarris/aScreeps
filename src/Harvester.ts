import { EnergyRole } from 'EnergyRole';
import { RoleMemory, RoleModeBody, RoleType } from 'Role';
import { CreepController } from 'CreepController';

export class Harvester extends EnergyRole {
    private source: Source;

    private static levelBodies: RoleModeBody = {
        1: [WORK, CARRY, MOVE, MOVE],
        2: [WORK, CARRY, MOVE, MOVE],
        3: [WORK, CARRY, MOVE, MOVE],
        4: [WORK, CARRY, MOVE, MOVE],
        5: [WORK, CARRY, MOVE, MOVE],
        6: [WORK, CARRY, MOVE, MOVE],
        7: [WORK, CARRY, MOVE, MOVE],
        8: [WORK, CARRY, MOVE, MOVE],
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
        // check if creep is dead if so - set flag to request new creep
        if (this.creepName && !(this.creepName in Game.creeps)) {
            this.creepRequested = false;
            return;
        }
        // ensure has creepController
        if (!this.creepController)
            return;

        // refresh creepController to get updated creep for this tick
        this.creepController.refresh();
        if (this.mode === HarvesterMode.Normal) {
            this.runNormal(this.creepController);
        }
    }

    private runNormal(cc: CreepController): void {
        if (this.stage === HarvesterStage.MoveToSource) {
            if (!cc.pos.inRangeTo(this.source, 1)) {
                cc.moveTo(this.source.pos);
            } else {
                this.stage = HarvesterStage.HarvestSource;
            }
        } else if (this.stage === HarvesterStage.HarvestSource) {
            if (cc.carry < cc.carryCapacity) {
                cc.harvest(this.source);
            } else {
                this.stage = HarvesterStage.MoveToController;
            }
        } else if (this.stage === HarvesterStage.MoveToController) {
            if (!cc.pos.inRangeTo(
                cc.room.controller as StructureController, 3)) {
                if (cc.room.controller !== undefined) {
                    cc.moveTo(cc.room.controller.pos);
                }
            } else {
                this.stage = HarvesterStage.UpgradeController;
            }
        } else if (this.stage === HarvesterStage.UpgradeController) {
            if (cc.carry > 0) {
                cc.upgrade(cc.room.controller as StructureController);
            } else {
                this.stage = HarvesterStage.MoveToSource;
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
