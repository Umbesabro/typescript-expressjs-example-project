import { Request, Response, NextFunction } from 'express';
export default class ExampleValidator {
    public validateExamplePostRequest(req:Request, res:Response, next:NextFunction) {
        if(!req.body.msg) {
            res.status(400).send({message:'msg field is not set'});
        } else {
            next();
        }
    }

    public validateExampleGetRequest(req:Request, res:Response, next:NextFunction) {
        if(!req.query.id) {
            res.status(400).send({message:'msg field is not set'});
        } else {
            next();
        }
    }
}
