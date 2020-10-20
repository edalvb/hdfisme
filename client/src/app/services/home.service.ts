import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(private http: HttpClient) { }

  getBienes() {
    return this.http.get(`${this.API_URL}/home/totbien`);
  }

  getAdministrativos() {
    return this.http.get(`${this.API_URL}/home/totadministrativo`);
  }

  getProveedores() {
    return this.http.get(`${this.API_URL}/home/totproveedor`);
  }
}
