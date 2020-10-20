import express, { Application } from 'express';
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import homeRoutes from './routes/homeRoutes';
import areaRoutes from "./routes/areaRoutes";
import bienRoutes from "./routes/bienRoutes";
import personaRoutes from "./routes/personaRoutes";
import administrativoRoutes from "./routes/administrativoRoutes";
import adminstrativoFilterRoutes from "./routes/adminstrativoFilterRoutes";
import proveedorRoutes from "./routes/proveedorRoutes";
import proveedorFilterRoutes from "./routes/proveedorFilterRoutes";
import responsableRoutes from "./routes/responsableRoutes";
import responsableFilterRoutes from "./routes/responsableFilterRoutes";
import asignaRoutes from "./routes/asignaRoutes";
import accesoRoutes from "./routes/usuario/accesoRoutes";
import registroRoutes from "./routes/usuario/registroRoutes";
import usuarioRoutes from "./routes/usuario/usuarioRoutes";
import perfilUsuarioRoutes from "./routes/usuario/perfilUsuarioRoutes";
import rolUsuarioRoutes from "./routes/usuario/rolUsuarioRoutes";
import svAdministrativoRoutes from "./routes/usuario/svAdministrativoRoutes";
import svProveedorRoutes from "./routes/usuario/svProveedorRoutes";
import svUsuarioRoutes from "./routes/usuario/svUsuarioRoutes";
import tecnicoRoutes from "./routes/tecnicoRoutes";
import incidenteEstadoRoutes from "./routes/incidenteRoutes";
import mantenimientoRoutes from "./routes/mantenimientoRoutes";
import mensajeRoutes from "./routes/mensajeRoutes";

import {verifyToken} from "./middlewares/AuthToken";

class Server {

    host = 'localhost';
    port = '3200';

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.app.use(verifyToken); // para ejecutar el middleware, antes de cualquier ruta.
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.port || this.port);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/home', homeRoutes);
        this.app.use('/api/acceso', accesoRoutes);
        this.app.use('/api/registro', registroRoutes);
        this.app.use('/api/perfil', perfilUsuarioRoutes);
        this.app.use('/api/bien', bienRoutes);
        this.app.use('/api/persona', personaRoutes);
        this.app.use('/api/tecnico', tecnicoRoutes);
        this.app.use('/api/incidente', incidenteEstadoRoutes);
        this.app.use('/api/area-administrativo', areaRoutes);
        this.app.use('/api/administrativo', administrativoRoutes);
        this.app.use('/api/administrativofilter', adminstrativoFilterRoutes);
        this.app.use('/api/proveedor', proveedorRoutes);
        this.app.use('/api/proveedorfilter', proveedorFilterRoutes);
        this.app.use('/api/responsable', responsableRoutes);
        this.app.use('/api/responsablefilter', responsableFilterRoutes);
        this.app.use('/api/asigna', asignaRoutes);
        this.app.use('/api/usuario', usuarioRoutes);
        this.app.use('/api/rol-usuario', rolUsuarioRoutes);
        this.app.use('/api/svusuario', svUsuarioRoutes);           // Sin vincular (sv) Usuarios
        this.app.use('/api/svadministrativo', svAdministrativoRoutes);    // Sin vincular (sv) Administrativos
        this.app.use('/api/svproveedor', svProveedorRoutes);         // Sin vincular (sv) Proveedores
        this.app.use('/api/mantenimiento', mantenimientoRoutes);
        this.app.use('/api/mensaje', mensajeRoutes);
        
    }

    start(): void {
        this.app.listen(this.app.get('port'), this.host, () => {
            console.log(`${this.host}:${this.app.get('port')}`);
        })
    }
}

const server = new Server();
server.start();