import { Request, Response } from "express";
import pool from "../../utils/database";

class IncidenteEstadoController {

    public async crear(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO estado_incidente SET ?', [req.body]);
        res.json({ mensaje: 'Estado de Incidente Guardado' });
    }

    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los estados de incidencias');

        const variable = await pool.query('SELECT * FROM estado_incidente;');
        res.json(variable);
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;

        const constArea = await pool.query('SELECT * FROM estado_incidente WHERE idestado_incidente = ?;'
            , [nombre]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "El Estado de Incidencia no existe" });
        res.json({ mensaje: 'La Incidencia fué encontrado.' });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE estado_incidente SET ? WHERE idestado_incidente = ?', [req.body, id]);
        res.json({ mensaje: 'El Estado de Incidencia fué actualizado.' })
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM estado_incidente WHERE idestado_incidente = ?', [id]);
        res.json({ mensaje: 'El Estado de Incidencia fué eliminado' });
    }
}

const cController = new IncidenteEstadoController();
export default cController;