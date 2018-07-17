import { HomeRoomMemory } from "./HomeRoom";
import { WrapperRoom } from "./WrapperRoom";
import { Dictionary } from "lodash";

export class HomeRoom extends WrapperRoom {

    private roomName: string;
    public effectiveLevel: number
    public myStructures: Dictionary<Structure[]>;

    constructor(room: Room) {
        super(room);
        this.roomName = room.name;
        this.myStructures = this.findMyStructures();
        this.effectiveLevel = this.calcEffectiveLevel();
    }

    private calcEffectiveLevel(): number {
        //todo
        return 1;
    }

    private findMyStructures(): Dictionary<Structure[]> {
        const dict: Dictionary<Structure[]> = {};
        _.forEach(this.structures, (value, key) => {
            if (key) {
                dict[key] = _.filter(value, (v) => {
                    if (v instanceof OwnedStructure) {
                        return v.my
                    } else {
                        return false;
                    }
                })
            }
        });
        return dict;
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
