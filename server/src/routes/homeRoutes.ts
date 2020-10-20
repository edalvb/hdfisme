import { Router } from "express";
import homeController from "../controllers/homeControllers";

class EstadoRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/totbien', homeController.countBien);
        this.router.get ('/totadministrativo', homeController.countAdministrativos);
        this.router.get ('/totproveedor', homeController.countProveedores);
    }
}

const estadoRoutes = new EstadoRoutes();
export default estadoRoutes.router;
