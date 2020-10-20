import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Pecosa } from '../models/Pecosa';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})

export class PecosaService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}/bien/pecosa`);
  }

  get(id: number | string) {
    return this.http.get(`${this.API_URL}/bien/pecosa/${id}`);
  }

  save(pecosa: Pecosa) {
    return this.http.post(`${this.API_URL}/bien/pecosa`, pecosa);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/bien/pecosa/${id}`);
  }

  update(updatepecosa: Pecosa) {
    return this.http.put(`${this.API_URL}/bien/pecosa/`, updatepecosa);
  }

}
