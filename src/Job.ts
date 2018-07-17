import { Harvester, HarvesterMemory } from 'Harvester';
import { Logger } from 'Logger';
import { Role, RoleMemory, RoleType } from 'Role';

export class Job {
    private roleType: RoleType;
    private creepName?: string;
    private role?: Role;

    constructor(roleType: RoleType, role?: Role, creepName?: string) {
        this.roleType = roleType;
        this.role = role;
        this.creepName = creepName;
    }

    public run(): void {
        console.log('job running - keks');
    }

    public save(): JobMemory {
        return {
            creepName: this.creepName,
            role: this.role ? this.role.save() : undefined,
            roleType: this.roleType
        };
    }

    public static load(jobMemory: JobMemory): Job {
        return new Job(jobMemory.roleType,
            jobMemory.role ? loadRole(jobMemory.roleType, jobMemory.role) : undefined,
            jobMemory.creepName);
    }
}

function loadRole(type: RoleType, roleMemory: RoleMemory): Role {
    if (type === RoleType.harvester) {
        return Harvester.load(roleMemory as HarvesterMemory);
    } else {
        throw new Error('could not load role');
    }
}

export interface JobMemory {
    roleType: RoleType;
    role?: RoleMemory;
    creepName?: string;
}
