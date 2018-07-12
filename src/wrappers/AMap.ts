import { ARoomPosition } from './ARoomPosition';

export class AMap {
    private map: GameMap;

    constructor(map: GameMap) {
        this.map = map;
    }

    public getTerrainAt(pos: ARoomPosition) {
        return this.map.getTerrainAt(pos._roomPosition);
    }
}
