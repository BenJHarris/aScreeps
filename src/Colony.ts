import { MemorySafeObject } from "MemorySafeObject";
import { Job, JobMemory } from "Job";

export class Colony {

    private jobs: Job[]

}

export interface ColonyMemory extends MemorySafeObject {
    [jobId: number]: JobMemory
}
