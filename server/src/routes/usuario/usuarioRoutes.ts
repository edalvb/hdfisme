import { Router } from "express";
import cController from "../../controllers/usuario/usuarioController";

class UsuarioRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', cController.reads);
        this.router.get('/:usuario', cController.read);
        this.router.post('/', cController.create);
        this.router.put('/:usuario', cController.update);
        this.router.delete('/:usuario', cController.delete);
    }
}

const rRoutes = new UsuarioRoutes();
export default rRoutes.router;
