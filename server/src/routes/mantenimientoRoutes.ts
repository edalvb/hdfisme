import { Router } from "express";
import mantenimientoController from "../controllers/mantenimientoController";

class MantenimientoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.get('/estado/', mantenimientoController.leerTodosEstado);
        this.router.get('/estado/:id', mantenimientoController.leerEstado);
        this.router.post('/estado/', mantenimientoController.crearEstado);
        this.router.put('/estado/:id', mantenimientoController.actualizarEstado);
        this.router.delete('/estado/:id', mantenimientoController.eliminarEstado);

        this.router.get('/tipo/', mantenimientoController.leerTodosTipo);
        this.router.get('/tipo/:id', mantenimientoController.leerTipo);
        this.router.post('/tipo/', mantenimientoController.crearTipo);
        this.router.put('/tipo/:id', mantenimientoController.actualizarTipo);
        this.router.delete('/tipo/:id', mantenimientoController.eliminarTipo);

        this.router.get('/prioridad/', mantenimientoController.leerTodosPrioridad);
        this.router.get('/prioridad/:id', mantenimientoController.leerPrioridad);
        this.router.post('/prioridad/', mantenimientoController.crearPrioridad);
        this.router.put('/prioridad/:id', mantenimientoController.actualizarPrioridad);
        this.router.delete('/prioridad/:id', mantenimientoController.eliminarPrioridad);

        this.router.get('/tarea/', mantenimientoController.leerTodosTarea);
        this.router.get('/tarea/:id', mantenimientoController.leerTarea);
        this.router.get('/tarea/grupo/:id', mantenimientoController.leerTareaGrupo);
        this.router.post('/tarea/', mantenimientoController.crearTarea);
        this.router.put('/tarea/:id', mantenimientoController.actualizarTarea);
        this.router.delete('/tarea/:id', mantenimientoController.eliminarTarea);

        this.router.get('/', mantenimientoController.leerTodos);
        this.router.get('/:id', mantenimientoController.leer);
        this.router.post('/', mantenimientoController.crear);
    }
}

const rRoutes = new MantenimientoRoutes();
export default rRoutes.router;
