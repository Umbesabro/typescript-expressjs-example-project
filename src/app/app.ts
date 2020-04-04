import express, { Express, Router } from 'express';
import Config from './configuration/config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import BaseController from './api/endpoint';
import bodyParser from 'body-parser';

export default class App {
    private app: Express;

    private httpsServer: https.Server;
    private httpServer: http.Server;
    public constructor() {
        this.app = express();
        this.enableHealthCheck();
        this.app.use(bodyParser.json({limit:"10mb"}));
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
        this.app.use(controller.Path, controller.Router);
    }

    private createHttpsServer(): void {
        this.httpsServer = https.createServer(
            {
                cert: fs.readFileSync(Config.instance().PathToCert),
                key: fs.readFileSync(Config.instance().PathToKey)
            },
            this.app);
    }

    private createHttpServer(): void {
        this.httpServer = http.createServer(this.app);
    }

    private listenHttpServer(): void {
        this.httpServer.listen(Config.instance().Port, () => {
            console.log(`smc-backend http server is listening on port: ${Config.instance().Port}`);
        });
    }

    private listenHttpsServer(): void {
        this.httpsServer.listen(Config.instance().Port, () => {
            console.log(`smc-backend https is listening on port: ${Config.instance().Port}`);
        });
    }

    private enableHealthCheck(): void {
        this.app.get('/healthcheck', (req, res) => res.sendStatus(200));
    }
}
