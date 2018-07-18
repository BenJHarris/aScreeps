export class SpawnRequest {
    public jobId: number;
    public body: BodyPartConstant[];

    constructor(jobId: number, body: BodyPartConstant[]) {
        this.jobId = jobId;
        this.body = body;
    }
}
