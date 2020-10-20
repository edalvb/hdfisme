import { Request, Response } from "express";
import pool from "../utils/database";

class ResponsableFilterController{
    public async get(req: Request, res: Response){
        const {bien} = req.params;
        const responsable = await pool.query('CALL get_responsable_bien( ? )', [bien]);
        if (responsable.length > 0){
            return res.json (responsable[0]);
        }
        res.status(404).json({text: "responsable no existe"});
        res.json({text: 'responsable fué encontrado.'});
    }

}

const cController = new ResponsableFilterController();
export default cController;
