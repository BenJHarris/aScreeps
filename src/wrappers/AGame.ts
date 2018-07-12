import { ACreep } from './ACreep';
import { AMap } from './AMap';
import { ARoom } from './ARoom';

export class AGame {

    private game: Game;

    public creeps: ACreep[];
    public rooms: ARoom[];
    public myRooms: ARoom[];
    public map: AMap;

    constructor(game: Game) {
        AGAME = this;
        this.game = game;
        this.map = new AMap(game.map);
        this.rooms = _.map(game.rooms, (r) => new ARoom(r));
        this.myRooms = _.filter(this.rooms, (r) => r.controller && r.controller.my);
        this.creeps = _.map(game.creeps, (c) => new ACreep(c));
    }

    public getRoomByName(name: string): ARoom | undefined {
        return _.find(this.rooms, (r) => r.name === name);
    }

    public run(): void {
        _.forEach(this.myRooms);
    }

}
