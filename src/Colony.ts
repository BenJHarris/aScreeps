import { ColonyMemory } from "Colony";
import { Job, JobMemory } from "Job";
import { HomeRoom, HomeRoomMemory } from "HomeRoom";

export class Colony {

    private jobs: Job[];
    private homeRoom: HomeRoom;

    constructor(jobs: Job[], homeRoom: HomeRoom) {
        this.jobs = jobs;
        this.homeRoom = homeRoom;
    }

    public save(): ColonyMemory {
        return {
            homeRoom: this.homeRoom.save(),
            jobs: _.map(this.jobs, (j) => j.save())
        };
    }

    public static load(colonyMemory: ColonyMemory): Colony {
        const jobs = _.map(colonyMemory.jobs, (j) => Job.load(j));
        const homeRoom = HomeRoom.load(colonyMemory.homeRoom);
        return new Colony(jobs, homeRoom);
    }

}

export enum ColonyMode {

}

export interface ColonyMemory {
    jobs: JobMemory[];
    homeRoom: HomeRoomMemory;
}
