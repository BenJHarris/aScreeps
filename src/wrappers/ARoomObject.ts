import {ARoom} from './ARoom';
import {ARoomPosition} from './ARoomPosition';

export class ARoomObject {

    private roomObject: RoomObject;
    public pos: ARoomPosition;
    public room: ARoom | undefined;

    constructor(roomObject: RoomObject) {
        this.roomObject = roomObject;
        this.pos = new ARoomPosition(this.roomObject.pos);
        this.room = this.roomObject.room === undefined ? undefined : new ARoom(this.roomObject.room);
    }
}
