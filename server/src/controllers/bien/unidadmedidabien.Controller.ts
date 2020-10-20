import { Request, Response } from "express";
import pool from "../../utils/database";

class UnidadMedidaBienController {
    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer Unidades de Medidas de los Bienes');
        
        const categoria = await pool.query('SELECT * FROM unidad_medida_bien;');
        res.json(categoria);
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constArea = await pool.query('SELECT * FROM unidad_medida_bien WHERE nombre = ?;'
            , [id]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "Unidad de Medida no existe" });
        res.json({ mensaje: 'Unidad de Medida fué encontrado.' });
    }

    public async crear(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO unidad_medida_bien SET ?', [req.body]);
        res.json({ mensaje: 'Unidad de Medida Guardado' });
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM unidad_medida_bien WHERE id = ?', [id]);
        res.json({ mensaje: 'Unidad de medida fué eliminado' });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE unidad_medida_bien SET ? WHERE id = ?', [req.body, id]);
        res.json({ mensaje: 'Unidad de Medida fué actualizado.' })
    }
}

const cController = new UnidadMedidaBienController();
export default cController; 