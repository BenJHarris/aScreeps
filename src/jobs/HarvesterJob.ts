import { Job, JobMode, JobType } from './Job';

export class HarvesterJob extends Job {
    constructor(mode: JobMode) {
        super(JobType.Harvester, mode);
    }
}
