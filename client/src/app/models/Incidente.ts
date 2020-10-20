export interface Incidente {
    idincidente?: number;
    idsolicitante: number;
    idestado: number;
    idgravedad: number;
    idtipo: number;
    idtecnico?: number;
    idgrupo_bien?: number;
    incidente: string;
    idsolucion: number;
    descripcion: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fecha_cierre: Date;
}

export interface IncidenteMostrar {
    idincidente: number;
    fecha_creacion:Date;
    incidente:string;
    descripcion: string;
    estado_incidente: string;
    gravedad_incidente: string;
    tipo_incidente: string;
    grupo_bien: string;
    solicitante: string;
    tecnico: string;
}

export interface IncidenteTipo {
    idtipo_incidente?: number;
    tipo_incidente: string;
    descripcion?: string;
}

export interface IncidenteEstado {
    idestado_incidente?: number;
    estado_incidente: string;
    descripcion?: string;
}

export interface IncidenteGravedad {
    idgravedad_incidente?: number
    gravedad_incidente: string
    descripcion?: string
}

export interface IncidenteSolucion {
    idsolucion_incidente?: number
    solucion_incidente: string
}