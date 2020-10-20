export interface RolUsuario {
    id: number;
    rol: string;
    descripcion: string;
    usuario: JSON;
    administrativo: JSON;
    proveedor: JSON;
    bien: JSON;
    incidente: JSON;
    tecnico: JSON;
    mantenimiento: JSON;
}
