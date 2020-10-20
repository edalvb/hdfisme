import { Request, Response } from "express";
import pool from "../../utils/database";

class RolUsuarioController {
    public async reads(req: any, res: Response) {
        try {
            // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
            if (req.pleer != 2) res.status(404).send({ mensaje: 'No tienes permiso para leer los roles de los usuarios' });

            const categoria = await pool.query('SELECT * FROM rol_usuario;');
            res.json(categoria);
        } catch (e) {

        }
    }

    public async read(req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const constArea = await pool.query('SELECT * FROM rol_usuario WHERE id = ?;'
            , [id]);

        if (constArea.length > 0) {
            return res.json(constArea[0]);
        }
        res.status(404).json({ mensaje: "El Rol no existe" });
        res.json({ mensaje: 'El Rol fué encontrado.' });
    }

    public async create(req: Request, res: any): Promise<void> {
        try {
            await pool.query('INSERT INTO rol_usuario SET ?', [req.body]);
            res.json({ mensaje: 'Rol Guardado' });
        } catch (e) {
            console.log(e);
            if (e.code == 'ER_BAD_NULL_ERROR') {
                return res.status(404).json({ mensaje: 'Rol vacío.' })
            } else if (e.code == 'ER_DUP_ENTRY') {
                return res.status(404).json({ mensaje: 'Este Rol ya existe.' })
            }
            return res.status(404).json({ mensaje: 'Algo Salió Mal' })
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM rol_usuario WHERE id = ?', [id]);
            res.json({ mensaje: 'El Rol fué eliminado' });
        } catch (e) {
            if (e.code == 'ER_ROW_IS_REFERENCED_2') {
                return res.status(404).json({ error: e, mensaje: 'No puedes eliminar a este Rol porque está referencido con algún usuario.' })
            }
            console.log(e)
            return res.status(404).json({ error: e, mensaje: 'Algo salió mal, no puedes eliminar a este Rol.' })
        }
    }

    public async update(req: any, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE rol_usuario SET ? WHERE id = ?', [req.body, id]);
        res.json({ mensaje: 'El Rol fué actualizado.' })
    }
}

const cController = new RolUsuarioController();
export default cController;