import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { EstadoBien } from '../models/EstadoBien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class EstadoBienService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/bien/estado`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/bien/estado/${nombre}`);
  }

  save(estado: EstadoBien) {
    return this.http.post(`${this.API_URL}/bien/estado`, estado);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/estado/${id}`);
  }

  update(id: number, updateEstado: EstadoBien) {
    return this.http.put(`${this.API_URL}/bien/estado/${id}`, updateEstado);
  }

}
