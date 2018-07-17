import { Colony } from 'Colony';
import { Empire } from 'Empire';
import { HomeRoom } from 'HomeRoom';

export function initEmpire(): Empire {

    // create homerooms
    const homeRooms: HomeRoom[] = [];
    _.forEach(Game.rooms, (r) => {
        if (r.controller && r.controller.my) homeRooms.push(new HomeRoom(r));
    });
    console.log('creating colonies');
    const colonies = _.map(homeRooms, (r) => Colony.init(r));
    return new Empire(colonies);
}
