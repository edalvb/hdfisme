import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Persona } from '../models/Persona';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  getpersonas() {
    return this.http.get(`${this.API_URL}/persona`);
  }

  getpersona(id: number | string) {
    return this.http.get(`${this.API_URL}/persona/${id}`);
  }

  savepersona(persona: Persona) {
    return this.http.post(`${this.API_URL}/persona`, persona);
  }

  deletepersona(id: number) {
    return this.http.delete(`${this.API_URL}/persona/${id}`);
  }

  updatepersona(id: number|string, updatepersona: Persona) {
    return this.http.put(`${this.API_URL}/persona/${id}`, updatepersona);
  }

}
