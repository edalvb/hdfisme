import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { ColorBien } from '../models/Bien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ColorBienService { 

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/bien/color`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/bien/color/${nombre}`);
  }

  save(models: ColorBien) {
    return this.http.post(`${this.API_URL}/bien/color`, models);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/color/${id}`);
  }

  update(id: number, updateModels: ColorBien) {
    return this.http.put(`${this.API_URL}/bien/color/${id}`, updateModels);
  }

}
