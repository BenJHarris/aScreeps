import { ACreep } from './ACreep';
import { ARoom } from './ARoom';

export class AGame {

    private game: Game;

    public creeps: ACreep[];
    public rooms: ARoom[];

    constructor(game: Game) {
        this.game = game;
        this.creeps = _.map(game.creeps, (c) => new ACreep(c));
        this.rooms = _.map(game.rooms, (r) => new ARoom(r));
    }

}
