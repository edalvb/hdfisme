import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Asigna } from '../models/Asigna';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class AsignaService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  save(asigna: Asigna) {
    return this.http.post(`${this.API_URL}/asigna`, asigna);
  }

  gets() {
    return this.http.get(`${this.API_URL}/asigna`);
  }

  get(id: number) {
    return this.http.get(`${this.API_URL}/asigna/${id}`);
  }

  update(updateAsigna: Asigna) {
    return this.http.put(`${this.API_URL}/asigna/`, updateAsigna);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/asigna/${id}`);
  }

}
