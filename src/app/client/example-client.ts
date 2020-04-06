import { ExampleModel } from '../model/example-model';
import axios, { AxiosRequestConfig } from 'axios';
import Config from '../configuration/config';

export default class ExampleClient {

    private readonly externalResourceBaseUrl: string = Config.instance().SampleExternalResourceUrl;

    public getExampleData(id: string): Promise<ExampleModel> {
        const options: AxiosRequestConfig = {
            url: '/example_data',
            baseURL: this.externalResourceBaseUrl,
            method: 'get',
            params: {
                id: id
            }
        };
        return axios(options);
    }
}
