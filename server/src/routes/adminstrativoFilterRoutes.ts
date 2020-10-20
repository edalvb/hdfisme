/**
 * Este es el route para realiza las consultas filtradas a las dos tablas (Adminstrativo y Persona)
 */

import { Router } from "express";
import adminstrativoFilterController from "../controllers/adminstrativoFilterController";

class AdministrativoFilterRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', adminstrativoFilterController.list);
        this.router.get ('/:id', adminstrativoFilterController.getOne);
    }
}

const administrativoFilterRoutes = new AdministrativoFilterRoutes();
export default administrativoFilterRoutes.router;
