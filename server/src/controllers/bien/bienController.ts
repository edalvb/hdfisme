import { Request, Response } from "express";
import pool from "../../utils/database";

class BienController {
    public async leerTodos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Bienes');

        const bien = await pool.query('SELECT * FROM vista_bienes;');
        res.json(bien); // Sino pongo que me devuelva la posición 0 del vector me devuelve un mensaje.
    }

    public async leer(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const bien = await pool.query('SELECT * FROM bien WHERE idbien = ?'
            //const bien = await pool.query('SELECT e.descripcion, a.marca, o.modelo, s.estado, e.color, e.precio, e.comentario, e.fecha_adquisicion FROM bien e, estado s, marca a, modelo o WHERE e.idbien = ? AND e.idestado = s.idestado AND e.idmarca = a.idmarca AND e.idmodelo = o.idmodelo GROUP BY e.idbien'
            , [id]);
        if (bien.length > 0) {
            return res.json(bien[0]);
        }
        res.status(404).json({ mensaje: "El bien no existe" });
        res.json({ mensaje: 'El bien fué encontrado.' });
    }

    public async crear(req: Request, res: Response): Promise<void> {
        var arr: any = []; // Se crea un array
        var i = 0; // Se crea una variable que irá aunmentando según la cantidad de parámetros de req.body
        for (var j in req.body) {
            arr[i] = req.body[j]; // Se asigna lo que tenga dentro del primera "clave" que tenga el json "req.body"
            i++; // Se incrementa en 1 cada vez que se asigne el valor al array.
        }
        try {
            await pool.query('CALL sp_crear_bien(?,?,?,?,?,?,?,?,?,?,?,?,?,? )', arr);
            res.json({ mensaje: 'bien Guardado' });
        } catch (e) {
            let mensaje = "Lo siento, no pude crear el bien.";
            switch (e.code) {
                case "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD":
                    mensaje = "número incorrecto";
                    break;
                case "ER_SIGNAL_EXCEPTION":
                    mensaje = e.sqlMessage;
                    break;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async eliminar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM bien WHERE idbien = ?', [id]);
            res.json({ mensaje: 'El bien fué eliminado' });
        } catch (e) {
            console.log(e);
            let mensaje = "Lo siento, no pude eliminar el bien.";
            switch (e.code) {
                case "ER_ROW_IS_REFERENCED_2":
                    mensaje = "Éste bien está siendo usado en el sistema.";
                    break;
            }
            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE bien set ? WHERE idbien = ?', [req.body, id]);
        res.json({ mensaje: 'El bien fué actualizado.' })
    }

    public async agrupar(req: Request, res: any): Promise<void> {
        let bienes: string = '';

        try {
            // Aquí voy a ejecutar el ordenamiendo del string de los bienes.
            req.body.bienes.forEach((b: any, i: number) => {
                bienes += `(?, ${b})${req.body.bienes.length - 1 == i ? '' : ', '}`
            });

            let query: string = `INSERT INTO detalle_grupo_bien (idgrupo_bien, idbien) VALUES ${bienes};`;
            console.log(query)

            const rpta = (await pool.query('CALL sp_crear_detalle_grupo_bien(?,?,?)', [req.body.grupo, req.body.motivo, query]));
            res.json({ mensaje: 'Se agrupó satisfactoriamente.' })
        } catch (e) {
            console.log(e);
            let mensaje: string = '';
            if (e.code == 'ER_PARSE_ERROR') mensaje = "Tiene un error en su sintaxis SQL.";

            res.status(404).json({ mensaje: mensaje });
        }
    }

    public async leerTodosGrupos(req: any, res: Response) {
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Bienes');

        const bien = await pool.query('SELECT idgrupo_bien, grupo_bien, motivo FROM hdfisme.grupo_bien;');
        res.json(bien); // Sino pongo que me devuelva la posición 0 del vector me devuelve un mensaje.
    }

    public async leerBienesGrupo(req: any, res: Response) {
        const { id } = req.params;
        // Se debe validar si el usuario tiene el privilegio de ejecutar este método.
        if (req.pleer != 2) res.status(404).send('No tienes permiso para leer los Bienes');

        const bien = await pool.query('CALL sp_leer_detalle_grupo_bien(?);', id);
        res.json(bien[0]); // Sino pongo que me devuelva la posición 0 del vector me devuelve un mensaje.
    }

}

const bienController = new BienController();
export default bienController;