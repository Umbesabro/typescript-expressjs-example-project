import { Material } from "../model/material";

export interface DatabaseClientApi {
    getMaterials(): Promise<Material[]>;
}
