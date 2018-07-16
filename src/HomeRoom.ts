import { HomeRoomMemory } from "./HomeRoom";
import { WrapperRoom } from "./WrapperRoom";

export class HomeRoom extends WrapperRoom {

    private roomName: string;

    constructor(room: Room) {
        super(room);
        this.roomName = room.name;
    }

    public save(): HomeRoomMemory {
        return {
            roomName: this.roomName
        };
    }

    public static load(homeRoomMemory: HomeRoomMemory): HomeRoom {
        const room = Game.rooms[homeRoomMemory.roomName];
        return new HomeRoom(room);
    }

}

export interface HomeRoomMemory {
    roomName: string;
}
