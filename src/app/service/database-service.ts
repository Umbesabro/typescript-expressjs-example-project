import { Material } from '../model/material';
import { DatabaseClientApi } from '../client/database-client.api';
import InMemoryDatabaseClient from '../client/in-memory-database-client';
export default class DatabaseService {
    private readonly databaseClient:DatabaseClientApi = new InMemoryDatabaseClient();

    async getMaterials():Promise<Material[]> {
        return await this.databaseClient.getMaterials();
    }
}
