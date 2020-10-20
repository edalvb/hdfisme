import { Router } from "express";
import { RutaPredeterminado } from "../utils/routesPredeterminado";

import cEstado from "../controllers/incidente/incidenteEstadoController";
import cTipo from "../controllers/incidente/incidenteTipoController";
import cGravedad from "../controllers/incidente/incidenteGravedadController";
import cIncidente from "../controllers/incidente/incidenteController";
import cSolucion from "../controllers/incidente/indidenteSolucion";



class IncidenteRoutes extends RutaPredeterminado{
    public router: Router = Router();

    constructor() {
        super();
        this.config();
    }

    config(): void {
        this.enrutador('/estado/', cEstado);
        this.enrutador('/tipo/', cTipo);
        this.enrutador('/gravedad/', cGravedad);
        this.enrutador('/solucion/', cSolucion);
        this.router.post ('/', cIncidente.crear);
        this.router.get ('/', cIncidente.leerTodos);
    }

}

const areaRoutes = new IncidenteRoutes();
export default areaRoutes.router;
