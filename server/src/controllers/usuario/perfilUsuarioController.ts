/**
 * Este controller trae de la base de datos solo la tabla Adminsitrativos
 * en otro controller se estará realuzando las consultas a las dos tablas (Adminsitrativo y Persona)
 */


import { Response } from "express";
import pool from "../../utils/database";

// Solo Usuario, Administrativo o Proveedor
import usuarioController from "../../controllers/usuario/usuarioController";
import administrativoController from "../administrativoController";
import proveedorController from "../proveedorController";

class PerfilUsuarioController {

    public async readme(req: any, res: Response): Promise<any> {
        if (req._id === undefined) return res.status(404).json({ mensaje: "No estás loggeado" });

        const user = await pool.query('CALL get_perfil(?)', [req._id]);
        if (user.length > 0) {
            return res.json(user[0][0]);
        }
        res.status(404).json({ mensaje: "El usuario no existe" });
        res.json({ mensaje: 'El usuario fué encontrado.' });
    }

    public async updateme(req: any, res: Response): Promise<any> {
        try {
            if (req.body.length == 9) { // Si tamaño es 9 se le está proveedor
                await proveedorController.update(req, res);
            } else if (req.body.length == 13) {
                await administrativoController.update(req, res)
            } else {
                await usuarioController.update(req, res);
            }
        } catch (e) {
            console.log(e);
            return res.status(404).json({ mensaje: "No puede realizar esta operación." });
        }
    }

}

const cController = new PerfilUsuarioController();
export default cController;