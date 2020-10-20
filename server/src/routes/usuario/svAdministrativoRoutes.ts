import { Router } from "express";
import cController from "../../controllers/usuario/vincularController";

class SinVincularAdministrativoRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get('/', cController.reads_a_sinvincular);
    }
}

const rRouters = new SinVincularAdministrativoRouters();
export default rRouters.router;
