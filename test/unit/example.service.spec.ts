import { ExampleModel } from '../../src/app/model/example-model';
import ExampleService from '../../src/app/service/example.service';
import { SinonSandbox } from 'sinon';
import sinon from 'sinon';
import ExampleClient from '../../src/app/client/example-client';
import { expect } from 'chai';

describe('ExampleService tests', ()=> {
    const sandbox:SinonSandbox = sinon.createSandbox();
    it('should return ExampleModel with data read from example client', async() => {
        //given
        const exampleModelFromClient:ExampleModel = {data:'some data'};
        sandbox.stub(ExampleClient.prototype, 'getExampleData').resolves(exampleModelFromClient);

        //when
        const exampleModelFromService:ExampleModel = await new ExampleService().getExampleData();

        //then
        expect(exampleModelFromService).to.eql(exampleModelFromClient);
    })
})
