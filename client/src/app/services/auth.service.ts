import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import keys from '../utils/keys';

import { Usuario } from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  /**
  * Obtenemos una respuesta que contiene "usuario: 1 | 0"
  * - Si existe usuarios registrados devolverá 1 sino 0
  */
  existeUsuarios() {
    return this.http.get(this.API_URL + '/acceso');
  }
  
  registro(user: Usuario) {
    return this.http.post<any>(this.API_URL + '/registro', user);
  }

  acceso(user: Usuario) {
    return this.http.post<any>(this.API_URL + '/acceso', user);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  acceder(): boolean {
    // Lo que esto hace es que va a retornar si existe el token en el LocalStorage devolverá true sino retornará false.
    return !!localStorage.getItem('token');

    // Que pasaria si quisiera logearlo por privilegios de usuario.
    // Aqui podría decir quien entra o no.
    // Tengo que llamar al tipo de usuario y luego a que páginas puede acceder.
    // Por ejemplo...
    //  Si el usuario es pepito y este solo puede ver la página 
  }

  cerrarSesion() {
    this.router.navigate(['/acceso']);
    localStorage.clear();
  }

}
