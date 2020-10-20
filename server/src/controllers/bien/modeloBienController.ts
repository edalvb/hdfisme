import { Request, Response } from "express";
import pool from "../../utils/database";

class ModeloBienController{
    public async leerTodos(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los modelos de los Bienes');
        
        const modelo = await pool.query('SELECT * FROM modelo_bien;');
        res.json (modelo);
    }

    public async leer (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const modelo = await pool.query('SELECT * FROM modelo_bien WHERE nombre = ?;'
        , [id]);
        if (modelo.length > 0){
            return res.json (modelo[0]);
        }
        res.status(404).json({mensaje: "El modelo no existe"});
        res.json({mensaje: 'El modelo fué encontrado.'});
    }

    public async crear (req: Request, res: Response): Promise<void>{
        await pool.query ('INSERT INTO modelo_bien SET ?', [req.body]);
        res.json ({mensaje: 'modelo Guardado'});
    }

    public async eliminar (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM modelo_bien WHERE id = ?', [id]);
        res.json ({mensaje: 'El modelo fué eliminado'});
    }

    public async actualizar (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE modelo_bien SET ? WHERE id = ?', [req.body, id]);
        res.json({mensaje: 'El modelo fué actualizado.'})
    }
}

const moController = new ModeloBienController();
export default moController;