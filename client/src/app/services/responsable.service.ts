import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Responsable } from '../models/Responsable';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  save(responsable: Responsable) {
    return this.http.post(`${this.API_URL}/responsable`, responsable);
  }

  gets() {
    return this.http.get(`${this.API_URL}/responsable`);
  }

  get(id: number) {
    return this.http.get(`${this.API_URL}/responsable/${id}`);
  }

  update(updateResponsable: Responsable) {
    return this.http.put(`${this.API_URL}/responsable/`, updateResponsable);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/responsable/${id}`);
  }

}
