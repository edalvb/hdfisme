/**
 * Este controller trae de la base de datos solo la tabla Adminsitrativos
 * en otro controller se estará realuzando las consultas a las dos tablas (Adminsitrativo y Persona)
 */


import { Response } from "express";
import pool from "../../utils/database";

const bcrypt = require('bcrypt');
const saltRounds = 10;

class UsuarioController {
    public async reads(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({mensaje: 'No tienes permiso para leer a todos los usuarios'});

        const usuario = (await pool.query('SELECT * FROM vista_usuarios;'));
        res.json(usuario);
    }

    public async read(req: any, res: Response): Promise<any> {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send({mensaje: 'No tienes permiso para leer a este usuario'});

        const { usuario } = req.params;
        const user = await pool.query('SELECT * FROM usuario WHERE usuario = ?;'
            , [usuario]);
        if (user.length > 0) {
            return res.json(user[0]);
        }
        res.status(404).json({ mensaje: "El usuario no existe" });
        res.json({ mensaje: 'El usuario fué encontrado.' });
    }

    public create(req: any, res: Response) {

        let user = req.body;
        try {
            // Encriptamos la contraseña y guardamos en la base de datos.
            bcrypt.hash(user.contrasena, saltRounds, function (err: any, hash: any) {
                
                console.log('Comprobando')
                console.log(err)
                if(err != undefined) {
                    return res.status(404).json({ err, mensaje: "Algo salió mal." });
                }

                user.contrasena = hash;
                console.log('-----BANNER------')
                console.log(user)
                pool.query('INSERT INTO usuario SET ?', user);
                res.json({ mensaje: 'usuario Guardado' });
            });
            console.log('-----BANDERAAAAA------')
        } catch (e) {
            console.log(e);
            if (e.code == 'ER_BAD_NULL_ERROR') {
                return res.status(404).json({ e, mensaje: "Completa los campos requeridos." });
            } else if (e.code == 'ER_DUP_ENTRY') {
                return res.status(404).json({ e, mensaje: "El usuario ya existe" });
            }
            return res.status(404).json({ e, mensaje: "Algo salió mal." });
        }
    }

    public async update(req: any, res: Response): Promise<void> {
        const { usuario } = req.params;

        let user = req.body;

        if (user.contrasena) {
            // Encriptamos la contraseña y guardamos en la base de datos.
            bcrypt.hash(user.contrasena, saltRounds, async function (err: any, hash: any) {
                if (err != undefined) {
                    return res.status(404).json({ err, mensaje: "Algo salió mal." });
                }
                user.contrasena = hash;
                await pool.query('UPDATE usuario SET ? WHERE usuario = ?', [user, usuario]);
            });
        } else {
            await pool.query('UPDATE usuario SET ? WHERE usuario = ?', [user, usuario]);
        }

        res.json({ mensaje: 'El usuario fué actualizado.' })
    }

    public async delete(req: any, res: Response) {
        const { usuario } = req.params;
        try {
            console.log("estoy acá");
            await pool.query('DELETE FROM usuario WHERE usuario = ?', [usuario]);
            res.json({ mensaje: 'El usuario fué eliminado' });
        } catch (e) {
            let mensaje = "Lo siento, no pude eliminar este Usuario.";
            switch (e.code) {
                case "ER_ROW_IS_REFERENCED_2":
                    mensaje = `${usuario} está siendo usado en el sistema.`;
                    break;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    /**
     * Obtiene al usuario loggeado, >> [idusuario, usuario]
     * - Si es administrativo, obtiene la concatenación de sus nombres y apellidos y el id usuario
     * - Si es proveedor obtiene la razon social como usuario y el id del usuario
     * - Si no está vinculado a ninguno de ellos obtiene el usuario.
     * @param req Método Request
     * @param res Método Response
     */
    public async leerUsuarioFiltrado(req: any, res: Response) {
        if (req._id === undefined) return res.status(404).json({ mensaje: "No estás loggeado" });

        const user = await pool.query('CALL sp_solo_usuario(?)', [req._id]);
        if (user.length > 0) {
            return res.json(user[0][0]);
        }
        res.status(404).json({ mensaje: "El usuario no existe" });
        res.json({ mensaje: 'El usuario fué encontrado.' });
    }

}

const cController = new UsuarioController();
export default cController;