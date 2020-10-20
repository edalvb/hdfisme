import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { Bien, BienResponsable } from '../models/Bien';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class BienService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api/bien`;

  constructor(private http: HttpClient) { }

  gets() {
    return this.http.get(`${this.API_URL}`);
  }

  get(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  /**
   * Crea un bien sin ningun responsable
   * @param bien interfaz de bien
   */
  save(bien: Bien) {
    return this.http.post(`${this.API_URL}`, bien);
  }

  /**
   * Crea un bien asignandole por defecto un resaponsble
   * @param bienResponsable Interfaz bienResponsable
   */
  crearBienResonsable(bienResponsable: BienResponsable){
    return this.http.post(`${this.API_URL}`, bienResponsable);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  update(id: number, updateBien: Bien) {
    return this.http.put(`${this.API_URL}/${id}`, updateBien);
  }

  /**
   * Agrupa los bienes
   * @param bien un json
   */
  agrupar(bien: {grupo: string, motivo: string, bienes: Array<any>}) {
    return this.http.post(`${this.API_URL}/agrupar`, bien);
  }

  /**
   * Obtiene todos los grupos de bienes
   */
  leerTodosGrupos() {
    return this.http.get(`${this.API_URL}/grupo`);
  }

  /**
   * Obtiene todos los bienes que pertenecen a un grupo.
   * @param id identificador del grupo de bienes
   */
  leerBienesGrupo(id: number | string) {
    return this.http.get(`${this.API_URL}/gbien/${id}`);
  }

}
