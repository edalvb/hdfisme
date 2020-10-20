import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Administrativo } from '../models/Administrativo';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class AdministrativosService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api/administrativo`;

  constructor(private http: HttpClient) { }

  getAdministrativos() {
    return this.http.get(`${this.API_URL}`);
  }

  getAdministrativo(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  saveAdministrativo(administrativo: any) {
    return this.http.post(`${this.API_URL}`, administrativo);
  }

  deleteAdministrativo(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateAdministrativo(updateAdministrativo: any) {
    return this.http.put(`${this.API_URL}`, updateAdministrativo);
  }

  obtenerMiIdAdministrativo() {
    return this.http.get(`${this.API_URL}/mi-id/`);
  }

}
