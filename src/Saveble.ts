import { MemorySafeObject } from "MemorySafeObject";

export interface Saveable {
    save(): MemorySafeObject;
    load(obj: MemorySafeObject): any;
}
