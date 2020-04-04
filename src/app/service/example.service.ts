import ExampleClient from '../client/example-client';
import { ExampleModel } from '../model/example-model';
export default class ExampleService {
    private readonly exampleClient:ExampleClient = new ExampleClient();

    public getExampleData():Promise<ExampleModel> {
        return this.exampleClient.getExampleData();
    }
}
