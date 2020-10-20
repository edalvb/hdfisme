import { Router } from "express";

export class RutaPredeterminado {
    public router: Router = Router();

    /**
     * De forma prederminada en los métodos http: 
     * GET: hay dos cuando con un "id" quieres que te devuelva, por 
     * lo general solo un registro y si nada leer todos los registros.
     * POST: no le pasamos nada y lo que hacemos con este método es crear una registro.
     * PUT: le pasamos un "id" y por lo general actualizamos un registro.
     * DELETE: le pasamos un "id" y por lo general eliminamos un registro.
     * @param subruta Nombre de la subruta que se adjuntará a la ruta principal
     * @param controlador Controlador que queremos enrutar
     */
    enrutador(subruta: string, controlador: any) {
        this.router.post(subruta, controlador.crear);
        this.router.get(subruta, controlador.leerTodos);
        this.router.get(`${subruta}:id`, controlador.leer);
        this.router.put(`${subruta}:id`, controlador.actualizar);
        this.router.delete(`${subruta}:id`, controlador.eliminar);
    }
}