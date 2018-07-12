export enum JobType {
    Harvester
}

export abstract class Job {
    public jobType: JobType;
    public renew: boolean = true;

    constructor(jobType: JobType) {
        this.jobType = jobType;
    }
}
