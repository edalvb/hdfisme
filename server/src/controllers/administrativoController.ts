/**
 * Este controller trae de la base de datos solo la tabla Adminsitrativos
 * en otro controller se estará realuzando las consultas a las dos tablas (Adminsitrativo y Persona)
 */


import { Request, Response } from "express";
import pool from "../utils/database";

class AdministrativoController {
    public async list(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'No tienes permiso para leer a estos administrativos' });

        const administrativo = await pool.query('SELECT * FROM administrativo;');
        res.json(administrativo);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const administrativo = await pool.query('SELECT * FROM administrativo WHERE idpersona = ?;'
            , [id]);
        if (administrativo.length > 0) {
            return res.json(administrativo[0]);
        }
        res.status(404).json({ mensaje: "El administrativo no existe" });
        res.json({ mensaje: 'El administrativo fué encontrado.' });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('CALL create_administrativo(?,?,?,?,?,?,?,?,?,?,?,?);', req.body);
            res.json({ mensaje: 'administrativo Guardado' });
        } catch (e) {
            let mensaje = "No pude crear el administrativo";
            switch (e.code) {
                case 'ER_LOCK_WAIT_TIMEOUT':
                    mensaje = 'Tiempo de espera de bloqueo excedido; intente reiniciar la transacción.';
                    break;
                case 'ER_SIGNAL_EXCEPTION':
                    mensaje = e.sqlMessage;
                    break;
            }
            console.log(e);
            res.status(404).json({ e, mensaje: mensaje });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('CALL update_administrativo( ?,?,?,?,?,?,?,?,?,?,?,?,? )', req.body);
            res.json({ mensaje: 'El administrativo fué actualizado.' })
        } catch (e) {
            console.log(e);
            if (e.code == 'ER_TRUNCATED_WRONG_VALUE') {
                res.status(404).json({ e, mensaje: "Dato de fecha incorrecto" });
            }
            res.status(404).json({ mensaje: "No pude actualizar el administrativo." });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM persona WHERE idpersona = ?', [id]);
            res.json({ mensaje: 'El administrativo fué eliminado' });
        } catch (e) {
            console.log(e);
            let mensaje = "Lo siento, no pude eliminar este Administrativo.";
            switch (e.code) {
                case "ER_ROW_IS_REFERENCED_2":
                    mensaje = "Éste Administrativo está siendo usado en el sistema.";
                    break;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async obtenerMiIdAdministrativo(req: any, res: Response) {
        const miIdAdministrativo = await pool.query('SELECT adm.idpersona FROM administrativo AS adm, persona per WHERE per.idpersona = adm.idpersona AND per.idusuario = ?', [req._id]);
        if (miIdAdministrativo[0] === undefined)
            res.json({ idpersona: null });
        else
            res.json(miIdAdministrativo[0]);
    }
}

const cController = new AdministrativoController();
export default cController;