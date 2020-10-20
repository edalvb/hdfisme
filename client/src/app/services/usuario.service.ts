import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../models/Usuario';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/usuario/`);
  }

  get(usuario: string) {
    return this.http.get(`${this.API_URL}/usuario/${usuario}/`);
  }

  save(usuario: Usuario) {
    return this.http.post(`${this.API_URL}/usuario`, usuario);
  }

  delete(usuario: string) {
    return this.http.delete(`${this.API_URL}/usuario/${usuario}/`);
  }

  update(usuario: string, updateUsuario: Usuario) {
    return this.http.put(`${this.API_URL}/usuario/${usuario}/`, updateUsuario);
  }

}
