export class ARoomPosition {

    public x: number;
    public y: number;
    public roomName: string;

    constructor(pos: RoomPosition) {
        this.x = pos.x;
        this.y = pos.y;
        this.roomName = pos.roomName;
    }
}
