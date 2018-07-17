import { Logger } from "Logger";

export class Harvester {

    public static getBodyForMode(level: number)  {

    }

    public static run(creep: Creep, mode: HarvesterMode, stage: HarvesterStage): void {

        if (mode === HarvesterMode.Standard) {
            this.runModeNormal(stage);
        } else {
            Logger.log(`Unknown mode on harvester ${creep.name}`, 3);
        }

    }

    private static runModeNormal(stage: number) {

    }
}

export enum HarvesterMode {
    Standard
}

export enum HarvesterStage {

}
