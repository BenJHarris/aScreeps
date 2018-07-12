import {JobType} from 'jobs/Job';
import {ARoom} from 'wrappers/ARoom';

export enum RoomMode {
    startup = 0,
    operational = 1
}

export function getConfigForRoom(room: ARoom) {

    const roomConfig = {
        1: {
            [RoomMode.startup]: {
                [JobType.Harvester]: {
                    quantity: room.harvestPositions.length
                }
            },
            [RoomMode.operational]: {

            }
        },
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {}
    };

    return roomConfig[1];

}
