import { Request, Response } from "express";
import pool from "../utils/database";

class PersonaController {
    public async list(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer las Personas');
        
        res.json(await pool.query('SELECT * FROM persona;'));
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const persona = await pool.query('SELECT * FROM persona WHERE idpersona = ?;'
            , [id]);
        if (persona.length > 0) {
            return res.json(persona[0]);
        }
        res.status(404).json({ text: "El persona no existe" });
        res.json({ text: 'persona fué encontrado.' });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO persona SET ?', [req.body]);
        res.json({ message: 'persona Guardado' });
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM persona WHERE idpersona = ?', [id]);
            res.json({ message: 'persona fué eliminado' });
        } catch (e) {
            console.log(e);
            let mensaje = "Lo siento, no pude eliminar esta Persona.";
            switch (e.code) {
                case "ER_ROW_IS_REFERENCED_2":
                    mensaje = "Ésta Persona está siendo usado en el sistema.";
                    break;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE persona SET ? WHERE idpersona = ?', [req.body, id]);
        res.json({ message: 'persona fué actualizado.' })
    }
}

const cController = new PersonaController();
export default cController;