export enum JobType {
    Harvester = 0
}

export type JobMode = number;

export class Job {
    public jobId: number;
    public jobType: JobType;
    public jobMode: JobMode;
    public renew: boolean = true;

    constructor(jobType: JobType, jobMode: JobMode, jobId?: number) {
        this.jobId = jobId ? jobId : Memory.jobId++;
        this.jobType = jobType;
        this.jobMode = jobMode;
    }

    public save(): void {
        Memory.jobs[this.jobId] = this;
    }

    public static fromMemory(id: number): Job {
        const jobMem = Memory.jobs[id];
        return new Job(jobMem.jobType, jobMem.jobMode, id);
    }
}
