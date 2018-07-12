export enum JobType {
    Harvester = 0
}

export type JobMode = number;

export abstract class Job {
    public jobType: JobType;
    public jobMode: JobMode;
    public renew: boolean = true;

    constructor(jobType: JobType, jobMode: JobMode) {
        this.jobType = jobType;
        this.jobMode = jobMode;
    }
}
