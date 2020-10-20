import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { UnidadMedidaBien } from '../models/UnidadMedidaBien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaBienService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/bien/unidadmedida`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/bien/unidadmedida/${nombre}`);
  }

  save(unidadMedidaBien: UnidadMedidaBien) {
    return this.http.post(`${this.API_URL}/bien/unidadmedida`, unidadMedidaBien);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/unidadmedida/${id}`);
  }

  update(id: number, updateUnidadMedidaBien: UnidadMedidaBien) {
    return this.http.put(`${this.API_URL}/bien/unidadmedida/${id}`, updateUnidadMedidaBien);
  }

}
