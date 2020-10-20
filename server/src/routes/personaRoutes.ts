import { Router } from "express";
import personaController from "../controllers/personaController";

class PersonaRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', personaController.list);
        this.router.get ('/:id', personaController.getOne);
        this.router.post ('/', personaController.create);
        this.router.put ('/:id', personaController.update);
        this.router.delete ('/:id', personaController.delete);
    }
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;
