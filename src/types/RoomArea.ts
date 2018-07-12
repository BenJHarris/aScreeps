import { ARoomPosition } from 'wrappers/ARoomPosition';

export class RoomArea {

    private static ROOM_LOWER_BOUND = 0;
    private static ROOM_UPPER_BOUND = 49;

    public roomName: string;
    public topLeft: ARoomPosition;
    public bottomRight: ARoomPosition;
    public positionArray: ARoomPosition[];
    constructor(roomName: string, x1: number, y1: number, x2: number, y2: number) {
        this.roomName = roomName;
        if (this.checkBounds(x1) && x1 < x2 &&
            this.checkBounds(y1) && y1 < y2 &&
            this.checkBounds(x2) && this.checkBounds(y2)) {
            this.topLeft = new ARoomPosition(new RoomPosition(x1, y1, roomName));
            this.bottomRight = new ARoomPosition(new RoomPosition(x2, y2, roomName));
            this.positionArray = this.createPosArray(this.topLeft, this.bottomRight);
        } else {
            throw new Error('position must be within bounds');
        }
    }

    private checkBounds(num: number): boolean {
        return num >= RoomArea.ROOM_LOWER_BOUND && num <= RoomArea.ROOM_UPPER_BOUND;
    }

    private createPosArray(pos1: ARoomPosition, pos2: ARoomPosition): ARoomPosition[] {
        const arr: ARoomPosition[] = [];
        for (let x = pos1.x; x <= pos2.x; x++) {
            for (let y = pos1.y; y <= pos2.y; y++) {
                arr.push(new ARoomPosition(new RoomPosition(x, y, this.roomName)));
            }
        }
        return arr;
    }

    public getWalkablePositions(): ARoomPosition[] {
        const arr: ARoomPosition[] = [];
        _.forEach(this.positionArray, (p) => {
            if (AGAME.map.getTerrainAt(p) !== 'wall') {
                arr.push(p);
            }
        });
        return arr;
    }
}
