import { Request, Response } from "express";
import pool from "../utils/database";

class AsignaController {

    public async create(req: Request, res: Response): Promise<void> {
        // La siguiente sentencia puede recargar al servidor con for, si hay otro método para recorrer un json.
        // reeplazar éste método
        // Lo siguiente, recorre el json y le asigna los valores que tenga dentro de cada parámetro a un array
        var arr: any = []; // Se crea un array
        var i = 0; // Se crea una variable que irá aunmentando según la cantidad de parámetros de req.body
        for (var j in req.body) {
            arr[i] = req.body[j]; // Se asigna lo que tenga dentro del primera "clave" que tenga el json "req.body"
            i++; // Se incrementa en 1 cada vez que se asigne el valor al array.
        }
        
        try {
            // Aquí solo se está limitando a los argumentos que pueda recibir el procedimiento almacenado, que en este caso son 11
            await pool.query('CALL create_asigna(?,?,?,?);', arr);
            res.json({ message: 'asignacion Guardada' });
        } catch (e) {
            console.log(e);
            let mensaje = "Lo siento, no pude crear esta asignación.";
            if(e.code == 'ER_SIGNAL_EXCEPTION') {
                mensaje = e.sqlMessage;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async reads(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer las Asignaciones');
        
        const asigna = await pool.query('SELECT * FROM vista_asignaciones;');
        res.json(asigna);
    }

    public async read(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const asigna = await pool.query('CALL get_asigna( ? );', [id]);
        if (asigna.length > 0) {
            return res.json(asigna[0][0]);
        }
        res.status(404).json({ text: "asignacion no existe" });
        res.json({ text: 'asignacion fué encontrado.' });
    }
}

const cController = new AsignaController();
export default cController;
