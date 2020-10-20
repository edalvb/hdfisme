import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { TipoMovimiento } from '../models/TipoMovimiento';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class TipomovimientoService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) {
  }

  gets() {
    return this.http.get(`${this.API_URL}/tipomovimiento`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/tipomovimiento/${nombre}`);
  }

  save(tipoMovimiento: TipoMovimiento) {
    return this.http.post(`${this.API_URL}/tipomovimiento`, tipoMovimiento);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/tipomovimiento/${id}`);
  }

  update(id: number, tipoMovimiento: TipoMovimiento) {
    return this.http.put(`${this.API_URL}/tipomovimiento/${id}`, tipoMovimiento);
  }

}
