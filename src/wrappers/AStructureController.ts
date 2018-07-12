import { AStructure } from './AStructure';

export class AStructureController extends AStructure {
    private controller: StructureController;
    public my: boolean;
    public level: number;

    constructor(controller: StructureController) {
        super(controller);
        this.controller = controller;
        this.my = controller.my;
        this.level = controller.level;
    }
}
