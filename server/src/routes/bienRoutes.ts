import { Router } from "express";

import cBien from "../controllers/bien/bienController";
import cEstado from "../controllers/bien/estadoBienController";
import cMarca from "../controllers/bien/marcaBienController";
import cModelo from "../controllers/bien/modeloBienController";
import cPecosa from "../controllers/bien/pecosaController";
import cUnidadMedida from "../controllers/bien/unidadmedidabien.Controller";
import cColor from "../controllers/bien/colorController";
import cTipo from "../controllers/bien/tipoBienController";

class BienRouters {
    public router: Router = Router();

    constructor () {
        this.config ();
    }

    config(): void {
        this.router.get('/gbien/:id', cBien.leerBienesGrupo); // Obtiene todos los bienes de un grupo
        this.router.get('/grupo/', cBien.leerTodosGrupos); // Obtiene todos los grupos
        this.router.post('/agrupar/', cBien.agrupar);
        this.enrutador('/estado/', cEstado);
        this.enrutador('/marca/', cMarca);
        this.enrutador('/modelo/', cModelo);
        this.rPecosa('/pecosa/', cPecosa);
        this.rPecosa('/tipo/', cTipo);
        this.enrutador('/unidadmedida/', cUnidadMedida);
        this.enrutador('/color/', cColor);
        this.enrutador('/', cBien);
    }

    rPecosa(subruta: string, controlador: any, ) {
        this.router.post(subruta, controlador.crear);
        this.router.get(subruta, controlador.leerTodos);
        this.router.get(`${subruta}:id`, controlador.leer);
        this.router.put(subruta, controlador.actualizar);
        this.router.delete(`${subruta}/:id`, controlador.eliminar);
    }

    enrutador(subruta: string, controlador: any) {
        this.router.post(subruta, controlador.crear);
        this.router.get(subruta, controlador.leerTodos);
        this.router.get(`${subruta}:id`, controlador.leer);
        this.router.put(`${subruta}:id`, controlador.actualizar);
        this.router.delete(`${subruta}:id`, controlador.eliminar);
    }
}

const equipoRouters = new BienRouters();
export default equipoRouters.router;
