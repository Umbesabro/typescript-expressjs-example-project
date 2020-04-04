import { DatabaseClientApi } from "./database-client.api";
import { Material } from "../model/material";

export default class InMemoryDatabaseClient implements DatabaseClientApi {
    private readonly materials: Material[] = [
        { code: 'M01', description: 'garlic', stock: 100, avgUsage: 10, safetyStock: 40 },
        { code: 'M02', description: 'black pepper', stock: 50, avgUsage: 25, safetyStock: 80 },
        { code: 'M03', description: 'onion', stock: 70, avgUsage: 12, safetyStock: 40 },
        { code: 'M04', description: 'thyme', stock: 85, avgUsage: 17, safetyStock: 60 },
        { code: 'M05', description: 'oregano', stock: 40, avgUsage: 33, safetyStock: 70 },
    ];
    async getMaterials():Promise<Material[]> {
        return this.materials;
    }
}
