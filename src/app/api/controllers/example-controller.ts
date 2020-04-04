import { NextFunction, Request, Response } from 'express';
import BaseController from '../endpoint';
import ExampleService from '../../service/example.service';
import ExampleValidator from '../validators/example-validator';

export default class ExampleController extends BaseController {
    public constructor() {
        super('/example');
        this.Router.get('/simple-get', this.simpleGet);
        this.Router.post('/validated-post', [new ExampleValidator().validateRequest], this.validatedPost);
    }

    public async simpleGet(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await new ExampleService().getExampleData();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    public async validatedPost(req: Request, res: Response, next: NextFunction) {
        try {
            const result = { message: `Received msg: ${req.body.msg}` };
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }
}
