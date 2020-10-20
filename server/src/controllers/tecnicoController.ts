import { Response } from "express";
import pool from "../utils/database";

class TecnicoController {

    public async leerTodos(req: any, res: any): Promise<void> {
        try{
            const model = (await pool.query('SELECT * FROM vista_tecnicos;'));
            res.json (model);
        }catch(e){
            console.log(e)
            return res.status(404).send({ mensaje: 'Lo siento, no pude listar a los técnicos' });
        }
    }

    /**
     * Lee a los todos los tecnicos; Administrativos y Proveedores, trae de vuelta:
     * - [idtecnico, tecnico] donde idtecnico es el idpersona y tecnico es el nombre del tecnico (nombres y apellidos o razon social)
     * @param req Request
     * @param res Response
     */
    public async leerAdminProve(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'Permiso insuficiente para leer los Técnicos' });

        return res.json({
            "administrativo": (await pool.query('SELECT * FROM vista_tecnico_administrativo;')), 
            "proveedor": (await pool.query('SELECT * FROM vista_tecnico_proveedor;'))
        });
    }

    public async reads_ap_sinvincular(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'Permiso insuficiente para leer los Técnicos' });

        try {
            res.json({
                "administrativo": (await pool.query('SELECT * FROM vista_administrativo_sinvincular_tecnico;')),
                "proveedor": (await pool.query('SELECT * FROM vista_proveedor_sinvincular_tecnico;'))
            });
        } catch (e) {
            console.log(e);
            return res.status(404).send({ e, mensaje: 'Algo Salió mal.' });
        }
    }

    public async vincular(req: any, res: any): Promise<void> {
        try {
            await pool.query('CALL vincular_tecnico(?, ?, ?);',
                [req.body.idpersona, req.body.funcion, req.body.comentario]);

            res.json({ message: 'Técnico, creado con existo.' })
        } catch (e) {
            if (e.code == 'ER_SIGNAL_EXCEPTION') {
                return res.status(404).send({ e, mensaje: e.sqlMessage });
            } else if (e.code == 'ER_DUP_ENTRY') {
                return res.status(404).send({ e, mensaje: 'El técnico ya está asignado.' });
            }
            return res.status(404).send({ e, mensaje: 'Algo Salió mal.' });
        }
    }

}

const cController = new TecnicoController();
export default cController;