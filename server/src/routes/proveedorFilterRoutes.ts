/**
 * Este es el route para realiza las consultas filtradas a las dos tablas (Adminstrativo y Persona)
 */

import { Router } from "express";
import proveedorFilterController from "../controllers/proveedorFilterController";

class ProveedorFilterRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', proveedorFilterController.list);
        this.router.get ('/:id', proveedorFilterController.getOne);
    }
}

const proveedorFilterRoutes = new ProveedorFilterRoutes();
export default proveedorFilterRoutes.router;
