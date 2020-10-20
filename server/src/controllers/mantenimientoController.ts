import { Request, Response } from "express";
import pool from "../utils/database";


class MantenimientoController {

    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).json({ mensaje: 'No tienes permiso suficientes para leer' });

        const constante = await pool.query('SELECT * FROM vista_mantenimiento;');
        res.json(constante);
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constante = await pool.query('SELECT * FROM mantenimiento WHERE idmantenimiento = ?;'
            , [id]);

        if (constante.length > 0) {
            return res.json(constante[0]);
        }
        res.status(404).json({ mensaje: "Este Mantenimiento no existe" });
        res.json({ mensaje: 'Mantenimiento fué encontrado.' });
    }

    /**
     * Un ejemplo sería como sigue:
     * - INSERT INTO grupo_tarea (idmatenimiento, idtarea) VALUES (?, 1), (?, 3);
     */
    public async crear(req: Request, res: any): Promise<void> {
        let tareas: string = '';
        console.log(req.body);

        try {
            // Aquí voy a ejecutar el ordenamiendo del string.
            // (?, valor) <-- donde valor es el dato que se encuentre en el array.
            // El ?, es el id de la otra tabla a la que se quiere unir o agrupar.
            req.body.grupoTarea.forEach((b: any, i: number) => {
                tareas += `(?, ${b})${req.body.grupoTarea.length - 1 == i ? '' : ', '}` // agrega una (, ) si aún no termina de iterar.
            });

            let query: string = `INSERT INTO grupo_tarea (idmantenimiento, idtarea) VALUES ${tareas};`;
            console.log(query)

            await pool.query('CALL sp_crear_grupo_tarea(?,?,?,?,?,?,?,?,?)', [
                req.body.mantenimiento.idtipo,
                req.body.mantenimiento.idprioridad,
                req.body.mantenimiento.idestado,
                req.body.mantenimiento.idgrupo_bien,
                req.body.mantenimiento.idtecnico,
                req.body.mantenimiento.descripcion,
                req.body.mantenimiento.fecha_mantenimiento,
                req.body.mantenimiento.fecha_fin,
                query]);
            res.json({ mensaje: 'Se agrupó satisfactoriamente.' })
        } catch (e) {
            console.log(e);
            let mensaje: string = 'Lo siento, algo salió mal.';
            if (e.code == 'ER_PARSE_ERROR') mensaje = "Tiene un error en su sintaxis SQL.";
            if (e.code == 'ER_SIGNAL_EXCEPTION') mensaje = e.sqlMessage;

            return res.status(404).json({ mensaje: mensaje });
        }
    }

    // ##################################################################################### Estado de Mantenimiento #####################################################################################
    public async leerTodosEstado(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).json({ mensaje: 'No tienes permiso suficientes para leer' });

        const constante = await pool.query('SELECT * FROM estado_mantenimiento;');
        res.json(constante);
    }

    public async leerEstado(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constante = await pool.query('SELECT * FROM estado_mantenimiento WHERE idestado_mantenimiento = ?;'
            , [id]);

        if (constante.length > 0) {
            return res.json(constante[0]);
        }
        res.status(404).json({ mensaje: "Estado no existe" });
        res.json({ mensaje: 'Estado fué encontrado.' });
    }

    public async crearEstado(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body)
            await pool.query('INSERT INTO estado_mantenimiento SET ?', [req.body]);
            res.json({ mensaje: 'Estado Guardado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async eliminarEstado(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM estado_mantenimiento WHERE idestado_mantenimiento = ?', [id]);
            res.json({ mensaje: 'El Estado fué eliminado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async actualizarEstado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('UPDATE estado_mantenimiento SET ? WHERE idestado_mantenimiento = ?', [req.body, id]);
            res.json({ mensaje: 'El Estado fué actualizado.' })
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    // ##################################################################################### Tipo de Mantenimiento #####################################################################################

    public async leerTodosTipo(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).json({ mensaje: 'No tienes permiso suficientes para leer' });

        const constante = await pool.query('SELECT * FROM tipo_mantenimiento;');
        res.json(constante);
    }

    public async leerTipo(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constante = await pool.query('SELECT * FROM tipo_mantenimiento WHERE idtipo_mantenimiento = ?;'
            , [id]);

        if (constante.length > 0) {
            return res.json(constante[0]);
        }
        res.status(404).json({ mensaje: "Tipo no existe" });
        res.json({ mensaje: 'Tipo fué encontrado.' });
    }

    public async crearTipo(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('INSERT INTO tipo_mantenimiento SET ?', [req.body]);
            res.json({ mensaje: 'Tipo de Mantenimiento Guardado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async eliminarTipo(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM tipo_mantenimiento WHERE idtipo_mantenimiento = ?', [id]);
        res.json({ mensaje: 'El Tipo de Mantenimiento fué eliminado' });
    }

    public async actualizarTipo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await pool.query('UPDATE tipo_mantenimiento SET ? WHERE idtipo_mantenimiento = ?', [req.body, id]);
            res.json({ mensaje: 'El Tipo de Mantenimiento fué actualizado.' })
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    // ##################################################################################### Prioridad de Mantenimiento #####################################################################################

    public async leerTodosPrioridad(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).json({ mensaje: 'No tienes permiso suficientes para leer' });

        const constante = await pool.query('SELECT * FROM prioridad_mantenimiento;');
        res.json(constante);
    }

    public async leerPrioridad(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constante = await pool.query('SELECT * FROM prioridad_mantenimiento WHERE idprioridad_mantenimiento = ?;'
            , [id]);

        if (constante.length > 0) {
            return res.json(constante[0]);
        }
        res.status(404).json({ mensaje: "Esta Prioridad de Mantenimiento no existe" });
        res.json({ mensaje: 'Prioridad de Mantenimiento fué encontrado.' });
    }

    public async crearPrioridad(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('INSERT INTO prioridad_mantenimiento SET ?', [req.body]);
            res.json({ mensaje: 'Prioridad de Mantenimiento Guardado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async eliminarPrioridad(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM prioridad_mantenimiento WHERE idprioridad_mantenimiento = ?', [id]);
        res.json({ mensaje: 'Prioridad de Mantenimiento fué eliminado' });
    }

    public async actualizarPrioridad(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE prioridad_mantenimiento SET ? WHERE idprioridad_mantenimiento = ?', [req.body, id]);
        res.json({ mensaje: 'Prioridad de Mantenimiento fué actualizado.' })
    }

    // ##################################################################################### Tarea de Mantenimiento #####################################################################################

    public async leerTodosTarea(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).json({ mensaje: 'No tienes permiso suficientes para leer' });

        try {
            const constante = await pool.query('SELECT * FROM tarea_mantenimiento;');
            res.json(constante);
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async leerTarea(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constante = await pool.query('SELECT * FROM tarea_mantenimiento WHERE idtarea_mantenimiento = ?;'
            , [id]);

        if (constante.length > 0) {
            return res.json(constante[0]);
        }
        res.status(404).json({ mensaje: "Esta Tarea de Mantenimiento no existe" });
        res.json({ mensaje: 'Tarea de Mantenimiento fué encontrado.' });
    }

    public async crearTarea(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('INSERT INTO tarea_mantenimiento SET ?', [req.body]);
            res.json({ mensaje: 'Tarea de Mantenimiento Guardado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async eliminarTarea(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM tarea_mantenimiento WHERE idtarea_mantenimiento = ?', [id]);
            res.json({ mensaje: 'Tarea de Mantenimiento fué eliminado' });
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async actualizarTarea(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await pool.query('UPDATE tarea_mantenimiento SET ? WHERE idtarea_mantenimiento = ?', [req.body, id]);
            res.json({ mensaje: 'Tarea de Mantenimiento fué actualizado.' })
        } catch (e) {
            console.log(e)
            let mensaje = 'Lo siento, no pude realizar esta acción.'
            if (e.code == 'ER_DUP_ENTRY') {
                mensaje = 'Este campo ya existe.'
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    /**
     * Devuelve las tareas que estén relacionadas a un grupo.
     */
    public async leerTareaGrupo(req: any, res: Response): Promise<any> {
        const { id } = req.params;
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Bienes');

        const bien = await pool.query('CALL sp_leer_grupo_tarea(?);', id);
        res.json(bien[0]); // Sino pongo que me devuelva la posición 0 del vector me devuelve un mensaje.
    }
    
}

const cController = new MantenimientoController();
export default cController;