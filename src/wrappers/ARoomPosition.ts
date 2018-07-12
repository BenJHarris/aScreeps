import { RoomArea } from 'types/RoomArea';

export class ARoomPosition {

    public _roomPosition: RoomPosition;
    public x: number;
    public y: number;
    public roomName: string;

    constructor(pos: RoomPosition) {

        this._roomPosition = pos;
        this.x = pos.x;
        this.y = pos.y;
        this.roomName = pos.roomName;
    }

    public findFreeSpaces(range: number): ARoomPosition[] {
        const x1 = this.x - range;
        const y1 = this.y - range;
        const x2 = this.x + range;
        const y2 = this.y + range;

        const area = new RoomArea(this.roomName, x1, y1, x2, y2);
        return area.getWalkablePositions();
    }
}
