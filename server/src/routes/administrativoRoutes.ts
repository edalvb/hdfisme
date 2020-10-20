import { Router } from "express";
import administrativoController from "../controllers/administrativoController";

class AdministrativoRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', administrativoController.list);
        this.router.get ('/mi-id/', administrativoController.obtenerMiIdAdministrativo);
        this.router.get ('/:id', administrativoController.getOne);
        this.router.post ('/', administrativoController.create);
        this.router.put ('/', administrativoController.update);
        this.router.delete ('/:id', administrativoController.delete);
    }
}

const administrativoRoutes = new AdministrativoRoutes();
export default administrativoRoutes.router;
