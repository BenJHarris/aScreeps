import { Colony, ColonyMemory } from 'Colony';
import { EmpireMemory } from 'Empire';

export class Empire {

    private colonies: Colony[];

    constructor(colonies: Colony[]) {
        this.colonies = colonies;
    }

    public run() {
        _.forEach(this.colonies, (c) => c.run());
    }

    public save(): EmpireMemory {
        return {
            colonies: _.map(this.colonies, (c) => c.save())
        };
    }

    public static load(empireMemory: EmpireMemory): Empire {
        const colonies = _.map(empireMemory.colonies, (c) => Colony.load(c));
        return new Empire(colonies);
    }
}

export interface EmpireMemory {
    colonies: ColonyMemory[];
}
