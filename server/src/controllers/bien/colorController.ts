import { Request, Response } from "express";
import pool from "../../utils/database";

class ColorController{
    public async leerTodos(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los colores de los Bienes');
        
        const estado = await pool.query('SELECT * FROM color_bien;');
        res.json (estado);
    }

    public async leer (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const estado = await pool.query('SELECT * FROM color_bien WHERE nombre = ?;'
        , [id]);
        if (estado.length > 0){
            return res.json (estado[0]);
        }
        res.status(404).json({mensaje: "El color no existe"});
        res.json({mensaje: 'El color fué encontrado.'});
    }

    public async crear (req: Request, res: Response): Promise<void>{
        await pool.query ('INSERT INTO color_bien SET ?', [req.body]);
        res.json ({mensaje: 'Color Guardado'});
    }

    public async eliminar (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM color_bien WHERE id = ?', [id]);
        res.json ({mensaje: 'El color fué eliminado'});
    }

    public async actualizar (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE color_bien SET ? WHERE id = ?', [req.body, id]);
        res.json({mensaje: 'El color fué actualizado.'})
    }
}

const eController = new ColorController();
export default eController;