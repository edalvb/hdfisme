import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { MarcaBien } from '../models/MarcaBien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class MarcaBienService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }
 
  gets() {
    return this.http.get(`${this.API_URL}/bien/marca`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/bien/marca/${nombre}`);
  }

  save(marca: MarcaBien) {
    return this.http.post(`${this.API_URL}/bien/marca`, marca);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/marca/${id}`);
  }

  update(id: number, updateMarca: MarcaBien) {
    return this.http.put(`${this.API_URL}/bien/marca/${id}`, updateMarca);
  }

}
