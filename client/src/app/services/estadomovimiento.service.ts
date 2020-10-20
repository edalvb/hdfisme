import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { EstadoMovimiento } from '../models/EstadoMovimiento';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class EstadoMovimientoService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) {
  }

  gets() {
    return this.http.get(`${this.API_URL}/estadomovimiento`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/estadomovimiento/${nombre}`);
  }

  save(estadoMovimiento: EstadoMovimiento) {
    return this.http.post(`${this.API_URL}/estadomovimiento`, estadoMovimiento);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/estadomovimiento/${id}`);
  }

  update(id: number, estadoMovimiento: EstadoMovimiento) {
    return this.http.put(`${this.API_URL}/estadomovimiento/${id}`, estadoMovimiento);
  }

}
