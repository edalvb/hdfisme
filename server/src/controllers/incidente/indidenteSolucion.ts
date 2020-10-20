import { Request, Response } from "express";
import pool from "../../utils/database";

class IncidenteSoucionController {

    public async crear(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO solucion_incidente SET ?', [req.body]);
        res.json({ mensaje: 'Solución de Incidente Guardado' });
    }

    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los estados de incidencias');

        const variable = await pool.query('SELECT * FROM solucion_incidente;');
        res.json(variable);
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;

        const constArea = await pool.query('SELECT * FROM solucion_incidente WHERE idsolucion_incidente = ?;'
            , [nombre]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "Solución de Incidencia no existe" });
        res.json({ mensaje: 'La Incidencia fué encontrado.' });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE solucion_incidente SET ? WHERE idsolucion_incidente = ?', [req.body, id]);
        res.json({ mensaje: 'Solución de Incidencia fué actualizado.' })
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM solucion_incidente WHERE idsolucion_incidente = ?', [id]);
        res.json({ mensaje: 'Soución de Incidencia fué eliminado' });
    }
}

const cController = new IncidenteSoucionController();
export default cController;