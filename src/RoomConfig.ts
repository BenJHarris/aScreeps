import { JobType } from 'jobs/Job';
import { ARoom } from 'wrappers/ARoom';

export interface RoomConfig {
    jobNumbers: Array<[JobType, number]>;
}

export function getConfigForRoom(room: ARoom): RoomConfig | undefined {
    if (!room.controller || !room.controller.my) { return undefined; }
}
