import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { RolUsuario } from '../models/RolUsuario';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }
  
  create(rolUsuario: RolUsuario) {
    return this.http.post(`${this.API_URL}/rol-usuario`, rolUsuario);
  }

  reads() {
    return this.http.get(`${this.API_URL}/rol-usuario`);
  }

  read(nombre: string) {
    return this.http.get(`${this.API_URL}/rol-usuario/${nombre}`);
  }
  
  update(id: number, updateRolUsuario: RolUsuario) {
    return this.http.put(`${this.API_URL}/rol-usuario/${id}`, updateRolUsuario);
  }
  
  delete(id: number) {
    return this.http.delete(`${this.API_URL}/rol-usuario/${id}`);
  }

}
