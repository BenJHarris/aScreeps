import { calcCreepBody } from 'utils/calcCreepBody';

export class SpawnRequest {
    public jobId: number;
    public body: BodyPartConstant[];
    public requiredEnergy: number;

    constructor(jobId: number, body: BodyPartConstant[]) {
        this.jobId = jobId;
        this.body = body;
        this.requiredEnergy = calcCreepBody(body);
    }

    // save and load

    public save(): SpawnRequestMemory {
        return {
            jobId: this.jobId,
            body: this.body
        }
    }

    public static load(srm: SpawnRequestMemory) {
        return new SpawnRequest(
            srm.jobId,
            srm.body
        );
    }
}

export interface SpawnRequestMemory {
    jobId: number;
    body: BodyPartConstant[];
}
