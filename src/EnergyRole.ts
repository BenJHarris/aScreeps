import { Role, RoleType } from 'Role';

/**
 * class used to house behaviors useful for roles that interact with the energy resource
 */
export abstract class EnergyRole extends Role {
    constructor(creep: Creep, mode: number, stage: number, type: RoleType) {
        super(creep, mode, stage, type);
    }
}
