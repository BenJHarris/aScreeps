import { ColonyMemory, Colony } from "Colony";
import { MemorySafeObject } from "MemorySafeObject";

export class Empire {

    private colonies: Colony[];


}

export interface EmpireMemory extends MemorySafeObject {
    [colonyIndex: number]: ColonyMemory;
}
