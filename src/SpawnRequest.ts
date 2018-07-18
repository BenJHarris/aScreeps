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
}
