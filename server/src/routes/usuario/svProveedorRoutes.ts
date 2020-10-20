import { Router } from "express";
import cController from "../../controllers/usuario/vincularController";

class SinVincularProveedorRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get('/', cController.reads_p_sinvincular);
    }
}

const rRouters = new SinVincularProveedorRouters();
export default rRouters.router;
