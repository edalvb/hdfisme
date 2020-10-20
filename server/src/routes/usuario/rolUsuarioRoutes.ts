import { Router } from "express";
import cController from "../../controllers/usuario/rolUsuarioController";

class RolUsuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', cController.reads);
        this.router.get('/:id', cController.read);
        this.router.post('/', cController.create);
        this.router.put('/:id', cController.update);
        this.router.delete('/:id', cController.delete);
    }
}

const rRoutes = new RolUsuarioRoutes();
export default rRoutes.router;
