import {ARoomObject} from './ARoomObject';
import {ARoomPosition} from './ARoomPosition';

export class ACreep extends ARoomObject {

    private creep: Creep;

    constructor(creep: Creep) {
        super(creep);
        this.creep = creep;
    }
}
