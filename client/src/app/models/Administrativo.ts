export interface Administrativo {
  idpersona: number;
  pnombre: string;
  snombre?: string;
  papellido: string;
  sapellido: string;
  DNI: string;
}

/**
 * Administrativo y los datos de persona
 */
export interface AdministrativoPersona {
  idpersona: number;
  administrativo: string;
  DNI: string;
  RUC: string;
  email: string;
  area: string;
  fechanacimiento: Date;
  celular: number;
  telefono: number;
  direccion: string;
}