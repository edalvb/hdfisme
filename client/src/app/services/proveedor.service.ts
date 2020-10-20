import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Proveedor } from '../models/Proveedor';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  getproveedores() {
    return this.http.get(`${this.API_URL}/proveedor`);
  }

  getproveedor(id: number) {
    return this.http.get(`${this.API_URL}/proveedor/${id}`);
  }

  saveproveedor(proveedor: any) {
    return this.http.post(`${this.API_URL}/proveedor`, proveedor);
  }

  deleteproveedor(id: number) {
    return this.http.delete(`${this.API_URL}/proveedor/${id}`);
  }

  updateproveedor(updateproveedor: any) {
    return this.http.put(`${this.API_URL}/proveedor/`, updateproveedor);
  }

}
