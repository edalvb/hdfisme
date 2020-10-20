import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class VincularUsuarioService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/svusuario`);
  }

  vincular(usuario: {idpersona: number, idusuario: number}) {
    return this.http.put(`${this.API_URL}/svusuario`, usuario);
  }

}
