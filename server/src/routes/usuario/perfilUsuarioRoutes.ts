import { Router } from "express";
import perfilController from "../../controllers/usuario/perfilUsuarioController";
import usuarioController from "../../controllers/usuario/usuarioController";

class MarcaRoutes {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config (): void {
        this.router.get ('/', perfilController.readme);
        this.router.get ('/usuario/', usuarioController.leerUsuarioFiltrado); // trae [idusuario, usuario], usuario; nombre y apellidos o razon social
        this.router.put ('/:usuario', perfilController.updateme);
    }
}

const marcaRoutes = new MarcaRoutes();
export default marcaRoutes.router;
