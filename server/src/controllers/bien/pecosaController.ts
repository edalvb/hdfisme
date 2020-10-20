import { Request, Response } from "express";
import pool from "../../utils/database";

class PecosaController {
    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer las pecosas de los Bienes');
        
        res.json(await pool.query('SELECT * FROM pecosa ORDER BY `year`;'));
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const pecosa = await pool.query('SELECT * FROM pecosa WHERE id = ?;'
            , [id]);
        if (pecosa.length > 0) {
            return res.json(pecosa[0]);
        }
        res.status(404).json({ text: "El pecosa no existe" });
        res.json({ text: 'pecosa fué encontrado.' });
    }

    public async crear(req: Request, res: Response): Promise<void> {
        // La siguiente sen tencia puede recargar al servidor con for, si hay otro método para recorrer un json.
        // reeplazar éste método
        // Lo siguiente, recorre el json y le asigna los valores que tenga dentrhy6o de cada parámetro a un array
        console.log(req.body);
        var arr: any = []; // Se crea un array
        var i = 0; // Se crea una variable que irá aunmentando según la cantidad de parámetros de req.body
        for (var j in req.body) {
            arr[i] = req.body[j]; // Se asigna lo que tenga dentro del primera "clave" que tenga el json "req.body"
            i++; // Se incrementa en 1 cada vez que se asigne el valor al array.
        }
        // Aquí solo se está limitando a los argumentos que pueda recibir el procedimiento almacenado, que en este caso son 3

        console.log(req.body);
        console.log(arr);
        await pool.query('CALL create_pecosa(?,?,?);', arr);
        res.json({ message: 'pecosa Guardado' });
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        await pool.query('DELETE FROM pecosa WHERE id = ?', [id]);
        res.json({ message: 'pecosa fué eliminado' });
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        //console.log(req.body);
        var arr: any = [];
        var i = 0; // Se crea una variable que irá aunmentando según la cantidad de parámetros de req.body
        for (var j in req.body) {
            arr[i] = req.body[j]; // Se asigna lo que tenga dentro del primera "clave" que tenga el json "req.body"
            //console.log(`${j}: ${req.body[j]}`)
            i++; // Se incrementa en 1 cada vez que se asigne el valor al array.
        }

        await pool.query('CALL update_pecosa( ?,?,?,? )', arr);
        res.json({ message: 'pecosa actualizado.' })
    }
}

const cController = new PecosaController();
export default cController;