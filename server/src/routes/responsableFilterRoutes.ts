import { Router } from "express";
import responsableFilterController from "../controllers/responsableFilterController";

class ResponsableFilterRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get ('/:bien', responsableFilterController.get);
    }
}

const rRouters = new ResponsableFilterRoutes();
export default rRouters.router;
