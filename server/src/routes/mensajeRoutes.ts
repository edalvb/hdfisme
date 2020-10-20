import { Router } from "express";
import cController from "../controllers/mensajeController";

class MensajeRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', cController.obtenerMisUltimosMensajes);
        this.router.get('/:destinatario', cController.leerMisMensajesCon);
        this.router.post('/', cController.NuevoMensajesDeMiPara);
        this.router.delete('/:idmensaje', cController.BorrarMensaje);

        this.router.get('/enviar/destinatario', cController.leerUsuarioNombre);
    }
}

const mensajeRoutes = new MensajeRoutes();
export default mensajeRoutes.router;
