import { Request, Response, Router } from "express";

export default class BaseController {
    private router: Router;
    private path: string;

    public constructor(basePath: string) {
        this.path = basePath;
        this.router = Router();
        this.setSubController(this);
    }

    public get Path(): string {
        return this.path;
    }
    public get Router(): Router {
        return this.router;
    }

    public setSubController(controller: BaseController) {
        this.router.use(controller.Path, controller.Router);
    }
}
