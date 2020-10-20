export interface TodosDestinatario {
  idusuario: number;
  nombre: string;
}

export interface MensajeDestinatario {
  idmensaje: number,
  fecha_creacion: Date,
  idemisor: number,
  iddestinatario: number,
  mensaje: string,
}

export interface UltimosMensajes {
  idusuario: number;
  usuario: string;
  idultimo_mensaje: number;
  ultimo_mensaje: string;
  fecha_mensaje: Date;
}