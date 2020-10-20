import { Request, Response } from "express";
import pool from "../utils/database";

class MensajeController {
    /**
     * Obtiene los mensajes del usuario logrado con el usuario que se le indique
     */
    public async leerMisMensajesCon(req: any, res: Response) {

        const { destinatario } = req.params;

        const mensaje = await pool.query('select idmensaje, fecha_creacion, idemisor, iddestinatario, mensaje from mensaje where idemisor = ? and iddestinatario = ? || idemisor = ? and iddestinatario = ? order by fecha_creacion', [req._id, destinatario, destinatario, req._id]);

        res.json(mensaje);
    }

    public async NuevoMensajesDeMiPara(req: any, res: Response) {
        const { destinatario, mensaje } = req.body;

        await pool.query('insert into mensaje set idemisor = ?, iddestinatario = ?, mensaje = ?', [req._id, destinatario, mensaje]);

        res.json({ mensaje: 'Mensaje Guardado' });
    }

    public async BorrarMensaje(req: any, res: Response) {
        const { idmensaje } = req.params;

        await pool.query('delete from mensaje where idmensaje = ? ', [idmensaje]);

        res.json({ mensaje: 'Mensaje Guardado' });
    }

    /**
     * Obtiene los ultimos mensajes (idusuario, usuario, idultimo_mensaje, ultimo_mensaje, fecha_mensaje) del usuario logeado.
     * - idusuario y usuario, con los datos del usuario con quien tiene una conversación el usuario logeado.
     */
    public async obtenerMisUltimosMensajes(req: any, res: Response) {
        
        try {
            const ultimos_mensajes = await pool.query('call sp_ultimos_mensajes(?)', [req._id]);

            res.json(ultimos_mensajes[0]);
        } catch (e) {
            console.log(e);
            let mensaje: string = 'Lo siento, algo salió mal.';

            return res.status(404).json({ mensaje: mensaje });
        }
    }

    /**
     * Obtiene a los todos usuarios (nombres) menos al usuario que tenga el token.
     */
    public async leerUsuarioNombre(req: any, res: Response) {
        const user = await pool.query('SELECT * FROM vista_all_usuario_nombre WHERE idusuario != ?', [req._id]);
        res.json(user);
    }
}

const cController = new MensajeController();
export default cController;