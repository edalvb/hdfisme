import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api/perfil`;

  constructor(private http: HttpClient) { }

  leerUsuarioFiltrado() {
    return this.http.get(`${this.API_URL}/usuario`);
  }

  readme() {
    return this.http.get(`${this.API_URL}`);
  }

  /**
   * Envía al servidor por el método GET el usuario (si se desea actualizar un Usuario) y 
   * Objetos JSON de tipo Usuario (puede contener solo los campos necesario), Administrativo o
   * Proveedor, el Servidor se encargará de comprobar lo que le estamos enviando
   * @param usuario Escriba el nombre del usuario sino escriba cualquier otro caracter, ejemplo: ''
   * @param updatePerson Esta varible es de cualquier tipo (any) pero tiene que contener valores que tendría uno de tipo: Usuario | Administrativo | Proveedor
   */
  updateme(usuario: string, updatePerson: any) {
    return this.http.put(`${this.API_URL}/${usuario}`, updatePerson);
  }

}
