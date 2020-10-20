import { Request, Response } from "express";
import pool from "../utils/database";

class AreaController {
    public async list(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer las Áreas');

        const area = await pool.query('SELECT * FROM area;');
        res.json(area);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { nombre } = req.params;

        const constArea = await pool.query('SELECT * FROM area WHERE nombre = ?;'
            , [nombre]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "El Area no existe" });
        res.json({ mensaje: 'La Area fué encontrado.' });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO area SET ?', [req.body]);
        res.json({ mensaje: 'Area Guardado' });
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM area WHERE id = ?', [id]);
        res.json({ mensaje: 'El area fué eliminado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE area SET ? WHERE id = ?', [req.body, id]);
        res.json({ mensaje: 'El area fué actualizado.' })
    }
}

const cController = new AreaController();
export default cController;