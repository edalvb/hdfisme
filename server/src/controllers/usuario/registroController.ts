import { Request, Response } from "express";
import jwt = require('jsonwebtoken');
import pool from "../../utils/database";

const bcrypt = require('bcrypt');
const saltRounds = 10;

class RegistroController {

    public async registro(req: Request, res: Response) {
        // Extraigo los datos usuario y contraseña del cuerpo de lo que retorne
        let usuario = req.body;

        // Encriptamos la contraseña y guardamos en la base de datos.
        bcrypt.hash(usuario.contrasena, saltRounds, async function (err: any, hash: any) {
            usuario.contrasena = hash;
            usuario.rol = 1;

            // Validamos por si acaso haya un error al crear nuestro primer usuario
            // Recordar que este SP creará un nuevo rol con el id=1.
            // Además está compuesto por una transacción en la que si ocurre algún error, no modificaría nada :).
            try {
                //Guardo el nuevo usuario en la base de datos
                await pool.query('CALL sp_crear_primer_usuario(?,?);', [usuario.usuario, usuario.contrasena]);
            } catch (e) {
                console.log(e);
                if (e.code == 'ER_SIGNAL_EXCEPTION') {
                    return res.status(404).json({ mensaje: e.sqlMessage });
                }
                return res.status(404).json({ mensaje: `No pude crear a ${usuario.usuario}` });
            }

            // Busca al usuario por el nombre de usuario
            const user = (await pool.query('CALL get_usuario(?)', usuario.usuario))[0][0];

            // Los datos que serán guardados en el token
            const payload = {
                _id: user.idusuario,
                rol: user.idrol
            }
            // Creamos un token, guardando el id del usuario y la palabra secreta
            // También podemos darle más opciones, por ejemplo cuanto quiero que dure el token o alguna otra variacion.
            // Lo recomendable es guardar la palabra secreta en este caso "secret" en una variable de entorno
            // Firmamos el token con 1 hora de caducidad.
            const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

            // Responde con el token que hemos creado.
            res.status(200).json({ token });

            // Luego que se crea el usuario y la contraseña del usuario se está guardando como texto plano, se podría cifrar con bcrypt

        });
    }
}

const cController = new RegistroController();
export default cController;