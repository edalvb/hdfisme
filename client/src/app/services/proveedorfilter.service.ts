import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ProveedorFilterService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  getProveedores() {
    return this.http.get(`${this.API_URL}/proveedorfilter`);
  }

  getProveedor(id: number) {
    return this.http.get(`${this.API_URL}/proveedorfilter/${id}`);
  }


}
