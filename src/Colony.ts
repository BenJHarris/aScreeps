import { ColonyMemory } from 'Colony';
import { HomeRoom, HomeRoomMemory } from 'HomeRoom';
import { Job, JobMemory } from 'Job';
import { RoleType } from 'Role';

export class Colony {

    private jobs: Job[];
    private homeRoom: HomeRoom;
    private level: number;

    constructor(jobs: Job[], homeRoom: HomeRoom) {
        this.jobs = jobs;
        this.homeRoom = homeRoom;
        this.level = homeRoom.level;
    }

    // save and load

    public run(): void {
        _.forEach(this.jobs, (j) => j.run());
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

    public static init(homeRoom: HomeRoom): Colony {
        console.log('a');
        const level = homeRoom.effectiveLevel;
        const jobs = createJobsFromConfig(colonyConfig[level].jobs);
        console.log('b');
        console.log(jobs);
        return new Colony(jobs, homeRoom);
    }

}

const colonyConfig: ColonyConfig = {
    1: {
        jobs: {
            harvester: 4
        }
    },
    2: {
        jobs: {
            harvester: 4
        }
    },
    3: {
        jobs: {
            harvester: 4
        }
    },
    4: {
        jobs: {
            harvester: 4
        }
    },
    5: {
        jobs: {
            harvester: 4
        }
    }
};

function createJobsFromConfig(jc: JobConfig): Job[] {
    const jobs: Job[] = [];
    _.forEach(jc, (v , key) => {
        let type: RoleType;
        if (key === 'harvester') {
            type = RoleType.harvester;
        } else {
            throw new Error('reeee');
        }
        _.times(v, () => jobs.push(new Job(type)));
    });
    return jobs;
}

interface ColonyConfig {
    [level: number]: {
        jobs: JobConfig
    };
}

interface JobConfig {
    [type: string]: number;
}

export enum ColonyMode {
    Normal
}

export interface ColonyMemory {
    jobs: JobMemory[];
    homeRoom: HomeRoomMemory;
}
