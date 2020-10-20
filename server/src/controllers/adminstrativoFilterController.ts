/**
 * En este Controller es para realizar consultas filtradas a las tablas (Administrativo y Persona)
 * en esta tabla se realiaran una sola consulta a las dos tablas para simular que es una tabla.
 */

import { Request, Response } from "express";
import pool from "../utils/database";

class AdministrativoFilterController{
    public async list(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer a estos administrativos');

        const administrativo = (await pool.query('SELECT * FROM vista_administrativos;'));
        res.json (administrativo);
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        try {
            const administrativo = (await pool.query('CALL get_administrativo(?);', [id]))[0][0];
            res.json (administrativo);
            res.json({text: 'El Administrativo Filtrado fué encontrado.'});
        } catch (e) {
            console.log(e)
            res.status(404).json({text: "El Administrativo Filtrado no existe"});
        }
    }
}

const cController = new AdministrativoFilterController();
export default cController;