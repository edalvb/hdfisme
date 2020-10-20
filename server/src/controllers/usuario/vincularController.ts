import { Response } from "express";
import pool from "../../utils/database";

class UsuarioController {

    public async reads_u_sinvincular(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'Permiso insuficiente para leer Usuarios' });

        const usuario = (await pool.query('SELECT * FROM vista_usuario_sinvincular;'));
        res.json(usuario);
    }

    public async reads_a_sinvincular(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'Permiso insuficiente para leer Administrativos' });

        const usuario = (await pool.query('SELECT * FROM vista_administrativos_sinvincular;'));
        res.json(usuario);
    }

    public async reads_p_sinvincular(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({ mensaje: 'Permiso insuficiente para leer Proveedores' });

        const usuario = (await pool.query('SELECT * FROM vista_proveedor_sinvincular;'));
        res.json(usuario);
    }

    public async vincular (req: any, res: any): Promise<void>{
        try {
            await pool.query('CALL vincular_usuario(?, ?);', [req.body.idpersona, req.body.idusuario]);
            res.json({message: 'El usuario fué actualizado.'})
        } catch (e) {
            if(e.code == 'ER_SIGNAL_EXCEPTION') {
                return res.status(404).send({ e, mensaje: e. sqlMessage});
            }else if(e.code == 'ER_DUP_ENTRY') {
                return res.status(404).send({ e, mensaje:'El usuario ya está asignado.'});
            }
            return res.status(404).send({ e, mensaje: 'Algo Salió mal.'});
        }
    }

}

const cController = new UsuarioController();
export default cController;