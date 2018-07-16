import { EmpireMemory } from "Empire";

declare global {
    interface Memory {
        empire: EmpireMemory;
    }
}
