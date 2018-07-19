import { ColonyMemory } from 'Colony';
import { Harvester, HarvesterMemory } from 'Harvester';
import { HomeRoom, HomeRoomMemory } from 'HomeRoom';
import { Role, RoleMemory, RoleType } from 'Role';
import { SpawnRequest, SpawnRequestMemory } from 'SpawnRequest';

export class Colony {

    private id: number;
    private roles: Role[];
    private homeRoom: HomeRoom;
    private level: number;
    private currentRoleId: number;
    private spawnQueue: SpawnRequest[];
    private avilableSpawns: StructureSpawn[];
    private availableEnergy: number;

    constructor(id: number, homeRoom: HomeRoom, currentRoleId: number, roles?: Role[], spawnQueue?: SpawnRequest[]) {
        this.id = id;
        this.homeRoom = homeRoom;
        this.level = homeRoom.level;
        this.currentRoleId = currentRoleId;
        this.avilableSpawns = homeRoom.availableSpawns;
        this.availableEnergy = homeRoom.availableEnergy;

        if (roles === undefined) {
            this.roles = this.createRolesFromConfig(colonyConfig[this.level].roles);
        } else {
            this.roles = roles;
        }

        if (spawnQueue === undefined) {
            this.spawnQueue = [];
        } else {
            this.spawnQueue = spawnQueue;
        }
    }

    public run(): void {

        console.log(this.spawnQueue);

        // process spawn queue
        if (this.spawnQueue.length > 0) {
            if (this.spawnQueue[0].requiredEnergy <= this.availableEnergy) {
                _.forEach(this.avilableSpawns, (s) => {
                    const sr = this.spawnQueue[0];
                    if (sr.requiredEnergy < this.availableEnergy) {
                        const creepName = `${this.id}-${sr.jobId}`;
                        s.spawnCreep(sr.body, creepName);
                        this.spawnQueue.shift();

                        const role = this.getRoleById(sr.jobId);
                        if (role !== undefined) {
                            role.setCreep(creepName);
                        }
                    }
                });
            }
        }

        // if role has creep, run role - otherwise add to spawn queue
        _.forEach(this.roles, (r) => {
            if (!r.hasCreep() && !r.creepRequested) {
                this.spawnQueue.push(new SpawnRequest(r.id, r.getBody(this.level)));
                r.creepRequested = true;
            } else if (r.hasCreep()) {
                r.run();
            }
        });
    }

    public refresh(): void {
        this.homeRoom = this.homeRoom.refresh();
        this.level = this.homeRoom.level;
        this.level = this.homeRoom.level;
        this.avilableSpawns = this.homeRoom.availableSpawns;
        this.availableEnergy = this.homeRoom.availableEnergy;
    }

    // save and load

    public save(): ColonyMemory {
        return {
            currentJobId: this.currentRoleId,
            homeRoom: this.homeRoom.save(),
            id: this.id,
            roles: _.map(this.roles, (r) => r.save()),
            spawnQueue: _.map(this.spawnQueue, (sr) => sr.save())
        };
    }

    public static load(colonyMemory: ColonyMemory): Colony {
        const jobs = _.map(colonyMemory.roles, (r) => {
            if (r.type === RoleType.harvester) {
                return Harvester.load(r as HarvesterMemory);
            } else {
                throw new Error(`Unknown role type ${r.type}`);
            }
        });
        const homeRoom = HomeRoom.load(colonyMemory.homeRoom);
        const spawnQueue = _.map(colonyMemory.spawnQueue, (sr) => SpawnRequest.load(sr));
        return new Colony(
            colonyMemory.id,
            homeRoom,
            colonyMemory.currentJobId,
            jobs,
            spawnQueue
        );
    }

    public static init(id: number, homeRoom: HomeRoom): Colony {
        const level = homeRoom.effectiveLevel;
        return new Colony(id, homeRoom, 0);
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
        if (rt === RoleType.harvester) {
            const source = this.homeRoom.sources[0];
            return Harvester.create(this.currentRoleId++, source);
        } else {
            throw new Error(`unkown role type ${rt}`);
        }
    }

    private getRoleById(id: number): Role | undefined {
        return _.find(this.roles, (r) => r.id === id);
    }
}

const colonyConfig: ColonyConfig = {
    1: {
        roles: {
            harvester: 4
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
    id: number;
    roles: RoleMemory[];
    homeRoom: HomeRoomMemory;
    currentJobId: number;
    spawnQueue: SpawnRequestMemory[];
}
