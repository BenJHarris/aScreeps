import { ARoomObject } from './ARoomObject';

export class ASource extends ARoomObject  {
    private source: Source;
    public energy: number;
    public energyCapacity: number;
    public id: string;
    public ticksToRegeneration: number;

    constructor(source: Source) {
        super(source);
        this.source = source;
        this.energy = source.energy;
        this.energyCapacity = source.energyCapacity;
        this.id = source.id;
        this.ticksToRegeneration = source.ticksToRegeneration;
    }
}
