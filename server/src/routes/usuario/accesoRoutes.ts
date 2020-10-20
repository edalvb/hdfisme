import { Router } from "express";
import cController from "../../controllers/usuario/accesoController";

class SignInRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.post('/', cController.acceso);
        this.router.get('/', cController.verificarUsuarioRol);
    }
}

const rRouters = new SignInRouters();
export default rRouters.router;
