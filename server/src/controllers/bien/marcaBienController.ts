import { Request, Response } from "express";
import pool from "../../utils/database";

class MarcaController{
    public async leerTodos(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer las marcas de los Bienes');

        const marca = await pool.query('SELECT * FROM marca_bien;');
        res.json (marca);
    }

    public async leer (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const marca = await pool.query('SELECT * FROM marca_bien WHERE nombre = ?;'
        , [id]);
        if (marca.length > 0){
            return res.json (marca[0]);
        }
        res.status(404).json({text: "El marca no existe"});
        res.json({text: 'El marca fué encontrado.'});
    }

    public async crear (req: Request, res: Response): Promise<void>{
        await pool.query ('INSERT INTO marca_bien SET ?', [req.body]);
        res.json ({message: 'marca Guardado'});
    }

    public async eliminar (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM marca_bien WHERE id = ?', [id]);
        res.json ({message: 'El marca fué eliminado'});
    }

    public async actualizar (req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE marca_bien SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El marca fué actualizado.'})
    }
}

const mController = new MarcaController();
export default mController;