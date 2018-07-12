import {Job, JobType} from './Job';

export class HarvesterJob extends Job {
    constructor() {
        super(JobType.Harvester);
    }
}
