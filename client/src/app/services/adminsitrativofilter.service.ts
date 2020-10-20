import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class AdminsitrativoFilterService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api/administrativofilter`;

  constructor(private http: HttpClient) { }

  getAdministrativos() {
    return this.http.get(`${this.API_URL}`);
  }

  getAdministrativo(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

}
