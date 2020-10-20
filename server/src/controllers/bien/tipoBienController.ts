import { Request, Response } from "express";
import pool from "../../utils/database";

class TipoBienController{
    public async leerTodos(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los tipos de Bienes');
        
        const tipo_bien = await pool.query('SELECT * FROM tipo_bien;');
        res.json (tipo_bien);
    }

    public async leer (req: Request, res: Response): Promise<any>{
        const {nombre} = req.params;
        const tipo_bien = await pool.query('SELECT * FROM tipo_bien WHERE nombre = ?;'
        , [nombre]);
        if (tipo_bien.length > 0){
            return res.json (tipo_bien[0]);
        }
        res.status(404).json({text: "El tipo_bien no existe"});
        res.json({text: 'El tipo_bien fué encontrado.'});
    }

    public async crear (req: Request, res: Response): Promise<void>{
        await pool.query ('INSERT INTO tipo_bien SET ?', [req.body]);
        res.json ({message: 'tipo_bien Guardado'});
    }

    public async eliminar (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM tipo_bien WHERE id = ?', [id]);
        res.json ({message: 'El tipo_bien fué eliminado'});
    }

    public async actualizar (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE tipo_bien SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El tipo_bien fué actualizado.'})
    }
}

const cController = new TipoBienController();
export default cController;