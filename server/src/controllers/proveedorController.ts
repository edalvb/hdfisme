import { Request, Response } from "express";
import pool from "../utils/database";

class ProveedorController {
    public async list(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Proveedores');
        
        const proveedor = await pool.query('SELECT * FROM proveedor;');
        res.json(proveedor);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const proveedor = await pool.query('SELECT * FROM proveedor WHERE idpersona = ?;'
            , [id]);
        if (proveedor.length > 0) {
            return res.json(proveedor[0]);
        }
        res.status(404).json({ mensaje: "El proveedor no existe" });
        res.json({ mensaje: 'El proveedor fué encontrado.' });
    }

    public async create(req: Request, res: any): Promise<void> {
        try {
            await pool.query('CALL create_proveedor(?,?,?,?,?,?,?,?);', req.body);
            return res.json({ mensaje: 'administrativo Guardado' });
        } catch (e) {
            console.log(e);
            return res.status(404).json({ mensaje: "No pude crear un proveedor" });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM persona WHERE idpersona = ?', [id]);
        res.json({ mensaje: 'El proveedor fué eliminado' });
    }

    public async update(req: Request, res: any): Promise<void> {
        try {
            await pool.query('CALL update_proveedor(?,?,?,?,?,?,?,?,?)', req.body);
            return res.json({ mensaje: 'El proveedor fué actualizado.' }) 
        } catch (e) {
            console.log(e);
            return res.status(404).json({ mensaje: "No pude actualizar el proveedor" });
        }
    }
}

const cController = new ProveedorController();
export default cController;