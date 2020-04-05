import BaseController from '../base-controller';
import ExampleController from './example-controller';
export default class RootController extends BaseController {
    public constructor() {
        super('/api/v1');
        this.setSubController(new ExampleController());
    }
}