import { Role, RoleType } from 'Role';

/**
 * class used to house behaviors useful for roles that interact with the energy resource
 */
export abstract class EnergyRole extends Role {
    constructor(id: number, mode: number, stage: number, roleType: RoleType, creepName?: string) {
        super(id, mode, stage, roleType, creepName);
    }
}
