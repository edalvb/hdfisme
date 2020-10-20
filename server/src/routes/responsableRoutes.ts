import { Router } from "express";
import responsableController from "../controllers/responsableController";

class ResponsableRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get ('/', responsableController.list);
        this.router.get ('/:id', responsableController.getOne);
        this.router.post ('/', responsableController.create);
        this.router.put ('/', responsableController.update);
        this.router.delete ('/:id', responsableController.delete);
    }
}

const rRouters = new ResponsableRoutes();
export default rRouters.router;
