import { Router } from "express";
import cController from "../../controllers/usuario/vincularController";

class SinVincularUsuarioRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get('/', cController.reads_u_sinvincular);
        this.router.put('/', cController.vincular)
    }
}

const rRouters = new SinVincularUsuarioRouters();
export default rRouters.router;
