export interface Mantenimiento {
    idmatenimiento: number;
    idtipo: number;
    idprioridad: number;
    idestado: number;
    idgrupo_bien: number;
    idtecnico: number;
    descripcion: string;
    fecha_mantenimiento: Date;
    fecha_fin: Date;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface EstadoMantenimiento {
    idestado_mantenimiento: number;
    estado_mantenimiento: string;
    descripcion?: string;
}

export interface TipoMantenimiento {
    idtipo_mantenimiento: number;
    tipo_mantenimiento: string;
    descripcion?: string;
}

export interface PrioridadMantenimiento {
    idprioridad_mantenimiento: number;
    prioridad_mantenimiento: string;
    descripcion?: string;
}

export interface TareaMantenimiento {
    idtarea_mantenimiento: number,
    tarea_mantenimiento: string,
    descripcion?: string
    horas?: number
}