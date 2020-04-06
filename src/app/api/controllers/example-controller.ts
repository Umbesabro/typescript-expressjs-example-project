import { NextFunction, Request, Response } from 'express';
import BaseController from '../base-controller';
import ExampleService from '../../service/example.service';
import ExampleValidator from '../validators/example-validator';

export default class ExampleController extends BaseController {
    public constructor() {
        super('/example');
        this.Router.get('/get', this.exampleGet);
        this.Router.post('/post', [new ExampleValidator().validateExamplePostRequest], this.examplePost);
        this.Router.get('/get-from-external-resource', [new ExampleValidator().validateExampleGetRequest], this.exampleGetFromExternalResource);
    }

    public async exampleGet(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ msg: 'Hello' });
        } catch (err) {
            next(err);
        }
    }

    public async exampleGetFromExternalResource(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await new ExampleService().getExampleData(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    public async examplePost(req: Request, res: Response, next: NextFunction) {
        try {
            const result = { message: `Received msg: ${req.body.msg}` };
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}
