import { Request, Response } from "express";
import jwt = require('jsonwebtoken');
import pool from "../../utils/database";

const bcrypt = require('bcrypt');

class AccesoController {

    /**
     * Obtenemos una respuesta que contiene "usuario: 1 | 0"
     * - Si existe usuarios registrados devolverá 1 sino 0
     */
    public async verificarUsuarioRol(req: Request, res: Response) {
        const user = (await pool.query('SELECT fn_existeusuarios() AS usuario'))[0];
        console.log(user);
        res.status(200).json(user);
    }

    public async acceso(req: Request, res: Response) {
        // Extraigo los datos usuario y contraseña del cuerpo de lo que retorne
        const { usuario, contrasena } = req.body;

        // Busca al usuario por el nombre de usuario
        const user = (await pool.query('CALL get_usuario(?)', usuario))[0][0];

        // Si no encuentra al usuario retorna un codigo de estado 401 y un mensaje 
        if (!user) return res.status(401).send({ quien: 'usuario', mensaje: "No pude encontrar tu cuenta en HDFISME" });

        console.log(contrasena);
        console.log(user.contrasena);
        // Cargue hash de su contraseña DB.
        const match = await bcrypt.compare(contrasena, user.contrasena);

        console.log(match);

        if (match) {
            // Los datos que serán guardados en el token
            const payload = {
                _id: user.idusuario,
                rol: user.idrol
            }

            // devuelve un toke cuando los datos del usuario son correctos
            // Firmamos el token con 1 hora de caducidad.
            const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

            // retorna un codigo de estado 200 y que devuelva el token que el usuario ha obtenido.
            return res.status(200).json({ token })
        }
        return res.status(401).send({ quien: 'contrasena', mensaje: "Contraseña incorrecta" });
    }
}

const cController = new AccesoController();
export default cController;