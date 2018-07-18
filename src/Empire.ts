import { Colony, ColonyMemory } from 'Colony';
import { EmpireMemory } from 'Empire';
import { HomeRoom } from 'HomeRoom';

export class Empire {

    private colonies: Colony[];
    private currentColonyId: number;

    constructor(colonies: Colony[], currentcolonyId: number) {
        this.colonies = colonies;
        this.currentColonyId = currentcolonyId;
    }

    public run() {
        _.forEach(this.colonies, (c) => c.run());
    }

    public refresh(): void {
        _.forEach(this.colonies, (c) => c.refresh());
    }

    public save(): EmpireMemory {
        return {
            colonies: _.map(this.colonies, (c) => c.save()),
            currentColonyId: this.currentColonyId
        };
    }

    public static load(empireMemory: EmpireMemory): Empire {
        const colonies = _.map(empireMemory.colonies, (c) => Colony.load(c));
        return new Empire(colonies, empireMemory.currentColonyId);
    }

    public static init(): Empire {
            // create homerooms
        const homeRooms: HomeRoom[] = [];
        _.forEach(Game.rooms, (r) => {
            if (r.controller && r.controller.my) homeRooms.push(new HomeRoom(r));
        });
        let colonyId = 0;
        const colonies = _.map(homeRooms, (r) => Colony.init(colonyId++, r));
        return new Empire(colonies, colonies.length);
    }
}

export interface EmpireMemory {
    colonies: ColonyMemory[];
    currentColonyId: number;
}
