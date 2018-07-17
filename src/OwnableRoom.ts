import { WrapperRoom } from 'WrapperRoom';

export class OwnableRoom extends WrapperRoom {

    public my: boolean;
    public controller: StructureController;
    public level: number;

    constructor(room: Room) {
        super(room);
        if (room.controller === undefined)
            throw new Error(`Ownable room cannot be instantiated on room ${this.name} without controller`);
        this.controller = room.controller;
        this.my = room.controller.my;
        this.level = room.controller.level;
    }
}
