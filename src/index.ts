import App from "./app/app";
import RootController from './app/api/controllers/root-controller';

const app = new App();

app.setRootController(new RootController());

app.start();
