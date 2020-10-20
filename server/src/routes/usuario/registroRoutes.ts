import { Router } from "express";
import cController from "../../controllers/usuario/registroController";

class SignupRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.post('/', cController.registro);
    }
}

const rRouters = new SignupRouters();
export default rRouters.router;
