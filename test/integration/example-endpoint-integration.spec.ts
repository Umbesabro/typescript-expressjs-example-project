import { IntegrationTools } from './integration-tools';
import request, { SuperTest, Test } from 'supertest';
import nock from 'nock';
import Config from '../../src/app/configuration/config';
import { ExampleModel } from '../../src/app/model/example-model';
import { expect } from 'chai';


describe('Example endpoint integration test', () => {
    const integrationTools: IntegrationTools = new IntegrationTools();
    const app: SuperTest<Test> = request(integrationTools.getApp());
    const externalResourceBaseUrl: string = Config.instance().SampleExternalResourceUrl
    beforeEach(() => nock.cleanAll());

    it('should get example data as a response of GET request on /example/get-from-external-resource', () => {
        const mockResponseFromExternalSource: ExampleModel = { data: 'Important data' }
        const idQuery = { id: 'xyz001' };

        nock(externalResourceBaseUrl)
            .get('/example_data')
            .query(idQuery)
            .reply(200, mockResponseFromExternalSource);

        return app
            .get('/api/v1/example/get-from-external-resource')
            .query(idQuery)
            .expect(response => {
                expect(response.status).to.eql(200);
                expect(response.body).to.eql(mockResponseFromExternalSource);
            })
    });
})