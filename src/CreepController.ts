export class CreepController {

    private creep: Creep;
    public pos: RoomPosition;

    constructor(creep: Creep) {
        this.creep = creep;
        this.pos = creep.pos;
    }

    public moveTo(rp: RoomPosition): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND {
        return this.creep.moveTo(rp);
    }

    public harvest(target: Source | Mineral): CreepActionReturnCode | ERR_NOT_FOUND | ERR_NOT_ENOUGH_RESOURCES {
        return this.creep.harvest(target);
    }

    public transfer(target: Creep|Structure, resourceType: ResourceConstant, amount?: number): ScreepsReturnCode {
        return this.creep.transfer(target, resourceType, amount);
    }
}
