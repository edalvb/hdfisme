import { Request, Response } from "express";
import pool from "../../utils/database";

class IncidenteTipoController {

    public async crear(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO tipo_incidente SET ?', [req.body]);
        res.json({ mensaje: 'Tipo de Incidente Guardado' });
    }

    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los tipos de incidencias');

        const variable = await pool.query('SELECT * FROM tipo_incidente;');
        res.json(variable);
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;

        const constArea = await pool.query('SELECT * FROM tipo_incidente WHERE idtipo_incidente = ?;'
            , [nombre]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "El Tipo de Incidencia no existe" });
        res.json({ mensaje: 'El tipo Incidencia fué encontrado.' });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE tipo_incidente SET ? WHERE idtipo_incidente = ?', [req.body, id]);
        res.json({ mensaje: 'El Tipo de Incidencia fué actualizado.' })
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM tipo_incidente WHERE idtipo_incidente = ?', [id]);
        res.json({ mensaje: 'El Tipo de Incidencia fué eliminado' });
    }
}

const cController = new IncidenteTipoController();
export default cController;