import { Request, Response } from "express";
import pool from "../../utils/database";

class IncidenteController {

    public async crear(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO incidente SET ?', [req.body]);
        res.json({ mensaje: 'Incidente Guardado' });
    }

    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los estados de incidencias');

        const variable = await pool.query('SELECT * FROM vista_incidentes;');
        res.json(variable);
    }

}

const cController = new IncidenteController();
export default cController;