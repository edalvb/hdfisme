import { Router } from "express";
import asignaController from "../controllers/asignaController";

class AsignaRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.post ('/', asignaController.create);
        this.router.get ('/', asignaController.reads);
        this.router.get ('/:id', asignaController.read);
    }
}

const rRouters = new AsignaRoutes();
export default rRouters.router;
