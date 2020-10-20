import { Request, Response } from "express";
import pool from "../utils/database";

class HomeController{

    public async countBien(req: Request, res: Response){
        const bien = await pool.query(`SELECT count(idbien) as pedir FROM bien;`);
        res.json (bien[0].pedir); // Se llama al valor que contiene la variable 'pedir'.
    }
    public async countAdministrativos(req: Request, res: Response){
        const administrativos = await pool.query(`SELECT count(idpersona) as pedir FROM administrativo;`);
        res.json (administrativos[0].pedir); // Se llama al valor que contiene la variable 'pedir'.
    }

    public async countProveedores(req: Request, res: Response){
        const proveedores = await pool.query(`SELECT count(idpersona) as pedir FROM proveedor;`);
        res.json (proveedores[0].pedir); // Se llama al valor que contiene la variable 'pedir'.
    }
}

const cController = new HomeController();
export default cController;