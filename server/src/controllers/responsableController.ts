import { Request, Response } from "express";
import pool from "../utils/database";

class ResponsableController{
    public async list(req: any, res: Response){
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Responsables');
        
        const responsable = await pool.query('SELECT * FROM vista_responsables;');
        res.json (responsable); // Sino pongo que me devuelva la posición 0 del vector me devuelve un mensaje.
    }

    public async getOne (req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        const responsable = await pool.query ('SELECT * FROM responsable WHERE idresponsable = ?', [id]);
        if (responsable.length > 0){
            return res.json (responsable[0]);
        }
        res.status(404).json({text: "responsable no existe"});
        res.json({text: 'responsable fué encontrado.'});
    }

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
            await pool.query('CALL create_responsable(?,?,?,?);', arr);
            res.json({ message: 'responsable Guardado' });
        } catch (e) {
            let mensaje = "Lo siento, no pude crear el responsable.";
            if(e.code == 'ER_SIGNAL_EXCEPTION') {
                mensaje = e.sqlMessage;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async delete (req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM responsable WHERE idresponsable = ?', [id]);
        res.json ({message: 'responsable fué eliminado'});
    }

    public async update(req: Request, res: Response): Promise<void> {
        //console.log(req.body);
        var arr: any = [];
        var i = 0; // Se crea una variable que irá aunmentando según la cantidad de parámetros de req.body
        for (var j in req.body) {
            arr[i] = req.body[j]; // Se asigna lo que tenga dentro del primera "clave" que tenga el json "req.body"
            //console.log(`${j}: ${req.body[j]}`)
            i++; // Se incrementa en 1 cada vez que se asigne el valor al array.
        }

        try {
            await pool.query('CALL update_responsable( ?,?,?,?,? )', arr);
            res.json({ message: 'responsable actualizado.' })
        } catch ( e) {
            let mensaje = "Lo siento, no pude actualizar el responsable.";
            if(e.code == 'ER_SIGNAL_EXCEPTION') {
                mensaje = e.sqlMessage;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }
}

const cController = new ResponsableController();
export default cController;
