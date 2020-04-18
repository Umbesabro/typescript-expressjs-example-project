import App from '../../src/app/app';
import RootController from '../../src/app/api/controllers/root-controller';
import nock from 'nock';
import { Express } from 'express';

export class IntegrationTools {
    private readonly app: App;
    constructor() {
        this.app = new App();
        this.app.setRootController(new RootController());
        nock.disableNetConnect();
        nock.enableNetConnect('localhost');
        nock.enableNetConnect('127.0.0.1');
    }

    public getApp(): Express {
        return this.app.getExpress();
    }
}