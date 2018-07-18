export class CreepController {

    private creep: Creep;
    public pos: RoomPosition;
    public carry: number;
    public carryCapacity: number;
    public room: Room;

    constructor(creep: Creep) {
        this.creep = creep;
        this.pos = creep.pos;
        this.carry = creep.carry[RESOURCE_ENERGY];
        this.carryCapacity = creep.carryCapacity;
        this.room = creep.room;
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

    public upgrade(target: StructureController): ScreepsReturnCode {
        return this.creep.upgradeController(target);
    }
}
