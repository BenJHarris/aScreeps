import { RoleModeBody, RoleType } from "Role";
import { EnergyRole } from "EnergyRole";

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
        8: [WORK, WORK, WORK, WORK, WORK, MOVE],
    }

    constructor(
        id: number,
        creepRequested: boolean,
        mode: number,
        stage: number,
        source: Source,
        creepName?: string
    ) {
        super(id, creepRequested, mode, stage, RoleType.harvester, creepName);
    }

    public run():void {}

    private runNormal(): void {}
}
