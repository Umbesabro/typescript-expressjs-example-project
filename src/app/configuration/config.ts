import selfsigned from 'selfsigned';
import fs from 'fs';
import customEnv from 'custom-env';

export default class Config {

    private static readonly config = new Config();

    private host: string;
    private port: string;
    private httpsMode: boolean;
    private pathToCert: string;
    private pathToKey: string;

    public constructor() {
        this.init();
    }

    public static instance() {
        return this.config;
    }

    public get Host(): string {
        return this.host;
    }

    public get Port(): string {
        return this.port;
    }

    public get HttpsMode(): boolean {
        return this.httpsMode;
    }

    public get PathToCert() {
        return this.pathToCert;
    }

    public get PathToKey() {
        return this.pathToKey;
    }

    private init() {
        this.loadSystemVariablesFromDotEnv();
        this.assignSystemVariablesToConfigVariables();

        if(this.certificatesExist()) {
            this.genertSelfSignedCertificates();
        }
    }

    private assignSystemVariablesToConfigVariables() {
        this.host = process.env.HOST;
        this.port = process.env.PORT;
        this.pathToCert = process.env.PATH_TO_CERT;
        this.pathToKey = process.env.PATH_TO_KEY;
        this.httpsMode = process.env.HTTPS_MODE === 'true';
    }

    private loadSystemVariablesFromDotEnv() {
        if (process.env.NODE_ENV) {
            customEnv.env(process.env.NODE_ENV);
        } else {
            customEnv.env();
        }
    }

    private certificatesExist():boolean {
        return fs.existsSync(this.pathToCert) && fs.existsSync(this.pathToKey);
    }

    private genertSelfSignedCertificates(): void {
        const certsDir = 'certificates';
        const attributes = [{ name: 'commonName', value: 'smc-backend' }];
        const pems = selfsigned.generate(attributes, { days: 365 });
        fs.mkdirSync(certsDir, { recursive: true });
        fs.writeFileSync(this.pathToCert, pems.cert);
        fs.writeFileSync(this.pathToKey, pems.private);
    }
}
