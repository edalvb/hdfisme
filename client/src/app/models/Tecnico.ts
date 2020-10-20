/**
 * Tiene solo idtecnico y tecnico
 */
export interface TecnicoSimple {
    idtecnico: number;
    tecnico: string;
  }
  
  /**
   * Contiene el nombre del grupo "Administrativo" o "Proveedor"
   * y un Arrays de Tecnico Simple (idtecnico, tecnico)
   */
  export interface GrupoTecnicoSimple {
    nombre: string;
    tecnico: TecnicoSimple[];
  }