import { ColonyMemory } from 'Colony';
import { HomeRoom, HomeRoomMemory } from 'HomeRoom';
import { RoleType, Role, RoleMemory } from 'Role';
import { SpawnRequest } from 'SpawnRequest';
import { Harvester, HarvesterMemory } from 'Harvester';

export class Colony {

    private roles: Role[];
    private homeRoom: HomeRoom;
    private level: number;
    private currentRoleId: number;
    private spawnQueue: SpawnRequest[];
    private avilableSpawns: StructureSpawn[];

    constructor(homeRoom: HomeRoom, currentRoleId: number, roles?: Role[], spawnQueue?: SpawnRequest[]) {
        this.homeRoom = homeRoom;
        this.level = homeRoom.level;
        this.currentRoleId = currentRoleId;
        this.avilableSpawns = homeRoom.availableSpawns;

        if (roles === undefined) {
            this.roles = this.createRolesFromConfig(colonyConfig[this.level].roles);
        } else {
            this.roles = roles;
        }

        if (spawnQueue === undefined) {
            this.spawnQueue = this.createSpawnQueue();
        } else {
            this.spawnQueue = spawnQueue;
        }
    }

    public run(): void {
        _.forEach(this.roles, (r) => r.run());
    }

    public refresh(): void {
        this.homeRoom = this.homeRoom.refresh();
        this.level = this.homeRoom.level;
    }

    // save and load

    public save(): ColonyMemory {
        return {
            homeRoom: this.homeRoom.save(),
            roles: _.map(this.roles, (r) => r.save()),
            currentJobId: this.currentRoleId
        };
    }

    public static load(colonyMemory: ColonyMemory): Colony {
        const jobs = _.map(colonyMemory.roles, (r) => {
            if (r.type === RoleType.harvester) {
                return Harvester.load(r as HarvesterMemory)
            } else {
                throw new Error(`Unknown role type ${r.type}`);
            }
        });
        const homeRoom = HomeRoom.load(colonyMemory.homeRoom);
        return new Colony(homeRoom, colonyMemory.currentJobId, jobs);
    }

    public static init(homeRoom: HomeRoom): Colony {
        const level = homeRoom.effectiveLevel;
        return new Colony(homeRoom, 0);
    }

    private createRolesFromConfig(rc: RoleConfig): Role[] {
        const roles: Role[] = [];
        _.forEach(rc, (v , key) => {
            let type: RoleType;
            if (key === 'harvester') {
                type = RoleType.harvester;
            } else {
                throw new Error('reeee');
            }
            _.times(v, () => roles.push(this.createRoleByType(type)));
        });
        return roles;
    }

    private createRoleByType(rt: RoleType): Role {
        let role: Role;
        if (rt === RoleType.harvester) {
            const source = this.homeRoom.sources[0];
            return Harvester.create(this.currentRoleId++, source)
        } else {
            throw new Error(`unkown role type ${rt}`);
        }
    }

    private createSpawnQueue(): SpawnRequest[] {
        const spawnRequests: SpawnRequest[] = [];
        _.forEach(this.roles, (r) => {
            if (!r.hasCreep()) spawnRequests.push(new SpawnRequest(r.id, r.getBody(this.level)));
        })
        return spawnRequests;
    }
}

const colonyConfig: ColonyConfig = {
    1: {
        roles: {
            harvester: 4,
        }
    },
    2: {
        roles: {
            harvester: 4
        }
    },
    3: {
        roles: {
            harvester: 4
        }
    },
    4: {
        roles: {
            harvester: 4
        }
    },
    5: {
        roles: {
            harvester: 4
        }
    }
};

interface ColonyConfig {
    [level: number]: {
        roles: RoleConfig
    };
}

interface RoleConfig {
    [type: string]: number;
}

export enum ColonyMode {
    Normal
}

export interface ColonyMemory {
    roles: RoleMemory[];
    homeRoom: HomeRoomMemory;
    currentJobId: number;
}
