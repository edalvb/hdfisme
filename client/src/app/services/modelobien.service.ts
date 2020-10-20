import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { ModeloBien } from '../models/ModeloBien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ModeloBienService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/bien/modelo`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/bien/modelo/${nombre}`);
  }

  save(modelobien: ModeloBien) {
    return this.http.post(`${this.API_URL}/bien/modelo`, modelobien);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/modelo/${id}`);
  }

  update(id: number, updateModeloBien: ModeloBien) {
    return this.http.put(`${this.API_URL}/bien/modelo/${id}`, updateModeloBien);
  }

}
