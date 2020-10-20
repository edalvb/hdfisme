export interface Bien {
  idbien: number;
  denominacion: string;
  idpecosa?: number;
  valor_adquisicion?: number;
  idmarca?: number;
  idmodelo?: number;
  idtipo?: number;
  idcolor?: number;
  serie_dimension?: number;
  idestado?: number;
  idunidad_medida?: number;
  comentario?: string;
  fecha_adquisicion?: Date;
  fecha_creacion?: Date;
}

export interface BienResponsable {
  idbien: number;
  denominacion: string;
  idpecosa?: number;
  valor_adquisicion?: number;
  idmarca?: number;
  idmodelo?: number;
  idtipo?: number;
  idcolor?: number;
  serie_dimension?: number;
  idestado?: number;
  idunidad_medida?: number;
  comentario?: string;
  fecha_adquisicion?: Date;
  fecha_creacion?: Date;
  administrativo: number;
	stock: number;
}

export interface ColorBien {
  id: number;
  nombre: string;
}

export interface GrupoBien {
  idgrupo_bien: number;
  grupo_bien: string;
  motivo: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
