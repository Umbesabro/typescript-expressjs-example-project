import express, { Express, Router } from 'express';
import Config from './configuration/config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import BaseController from './api/base-controller';
import bodyParser from 'body-parser';

export default class App {
    private express: Express;

    private httpsServer: https.Server;
    private httpServer: http.Server;
    public constructor() {
        this.express = express();
        this.enableHealthCheck();
        this.express.use(bodyParser.json({limit:"10mb"}));
    }

    public start(): void {
        if (Config.instance().HttpsMode) {
            this.createHttpsServer();
            this.listenHttpsServer();
        } else {
            this.createHttpServer();
            this.listenHttpServer();
        }
    }

    public setRootController(controller: BaseController): void {
        this.express.use(controller.Path, controller.Router);
    }

    public getExpress():Express {
        return this.express;
    }

    private createHttpsServer(): void {
        this.httpsServer = https.createServer(
            {
                cert: fs.readFileSync(Config.instance().PathToCert),
                key: fs.readFileSync(Config.instance().PathToKey)
            },
            this.express);
    }

    private createHttpServer(): void {
        this.httpServer = http.createServer(this.express);
    }

    private listenHttpServer(): void {
        this.httpServer.listen(Config.instance().Port, () => {
            console.log(`example http server is listening on port: ${Config.instance().Port}`);
        });
    }

    private listenHttpsServer(): void {
        this.httpsServer.listen(Config.instance().Port, () => {
            console.log(`example https is listening on port: ${Config.instance().Port}`);
        });
    }

    private enableHealthCheck(): void {
        this.express.get('/healthcheck', (req, res) => res.sendStatus(200));
    }
}
