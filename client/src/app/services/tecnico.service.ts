import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api/tecnico`;

  constructor(private http: HttpClient) { }

  leerTodos() {
    return this.http.get(`${this.API_URL}`);
  }
  
  /**
   * Lee a los técnicos [administrativos y proveedores] y trae de vuelta:
   * - un json conteniendo dentro dos array; administrativo y proveedor
   */
  leerAdminProve() {
    return this.http.get(`${this.API_URL}/adminprove`);
  }
 
  /**
   * 
   * @param id le pasas un parámetros
   */
  reads_ap_sinvincular() {
    return this.http.get(`${this.API_URL}/apsinvincular/`);
  }

  vincular(tecnico: {idpersona: number, funcion: string, comentario: string}) {
    return this.http.put(`${this.API_URL}`, tecnico);
  }

}
