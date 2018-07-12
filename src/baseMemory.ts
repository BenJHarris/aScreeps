import { JobMemory } from 'jobs/JobMemory';

declare global {
    interface Memory {
        aRooms: {
            [name: string]: {
                [jobId: number]: JobMemory
            }
        };
    }
}
