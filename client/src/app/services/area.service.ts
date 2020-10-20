import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Area } from '../models/Area';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) {
  }

  gets() {
    return this.http.get(`${this.API_URL}/area-administrativo`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/area-administrativo/${nombre}`);
  }

  save(area: Area) {
    return this.http.post(`${this.API_URL}/area-administrativo`, area);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/area-administrativo/${id}`);
  }

  update(id: number, updatearea: Area) {
    return this.http.put(`${this.API_URL}/area-administrativo/${id}`, updatearea);
  }

}
