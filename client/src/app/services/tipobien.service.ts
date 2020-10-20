import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { TipoBien } from '../models/TipoBien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class TipoBienService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api/bien`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/tipo`);
  }

  get(nombre: string) {
    return this.http.get(`${this.API_URL}/tipo/${nombre}`);
  }

  save(tipoBien: TipoBien) {
    return this.http.post(`${this.API_URL}/tipo`, tipoBien);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/tipo/${id}`);
  }

  update(id: number, updateTipoBien: TipoBien) {
    return this.http.put(`${this.API_URL}/tipo/${id}`, updateTipoBien);
  }

}
