import { Router } from "express";
import cController from "../controllers/tecnicoController";

class TecnicoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', cController.leerTodos);
        this.router.get('/adminprove/', cController.leerAdminProve);
        this.router.get('/apsinvincular/', cController.reads_ap_sinvincular);
        this.router.put('/', cController.vincular);
    }
}

const areaRoutes = new TecnicoRoutes();
export default areaRoutes.router;
