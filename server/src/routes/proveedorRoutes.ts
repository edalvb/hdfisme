import { Router } from "express";
import proveedorController from "../controllers/proveedorController";

class ProveedorRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', proveedorController.list);
        this.router.get ('/:id', proveedorController.getOne);
        this.router.post ('/', proveedorController.create);
        this.router.put ('/', proveedorController.update);
        this.router.delete ('/:id', proveedorController.delete);
    }
}

const proveedorRoutes = new ProveedorRoutes();
export default proveedorRoutes.router;
