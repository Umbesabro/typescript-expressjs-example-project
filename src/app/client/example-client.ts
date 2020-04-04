import { ExampleModel } from '../model/example-model';
export default class ExampleClient {

    //returns promise as normally it would send, for example, a http request to an external resource.
    public getExampleData(): Promise<ExampleModel> {
        return Promise.resolve({ data: 'example data' });
    }
}
