/**
 * En este Controller es para realizar consultas filtradas a las tablas (Proveedor y Persona)
 * en esta tabla se realiaran una sola consulta a las dos tablas para simular que es una tabla.
 */

import { Request, Response } from "express";
import pool from "../utils/database";

class ProveedorFilterController{
    public async list(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Proveedores');
        
        const proveedor = await pool.query('CALL get_proveedor(?);', [null]);
        if (proveedor.length > 0){
            return res.json (proveedor[0]);
        }
        res.json (proveedor);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const proveedor = await pool.query('CALL get_proveedor(?);', [id]);
        if (proveedor.length > 0){
            if (proveedor[0].length > 0){
                return res.json (proveedor[0][0]);
            }
            return res.json (proveedor[0]);
        }
        res.status(404).json({text: "El proveedor Filtrado no existe"});
        res.json({text: 'El proveedor Filtrado fué encontrado.'});
    }
}

const cController = new ProveedorFilterController();
export default cController;