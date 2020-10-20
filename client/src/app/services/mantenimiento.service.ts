import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { EstadoMantenimiento, TipoMantenimiento, PrioridadMantenimiento, Mantenimiento, TareaMantenimiento } from "../models/Mantenimiento";

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api/mantenimiento`;

  constructor(private http: HttpClient) { }

  leerTodos() {
    return this.http.get(`${this.API_URL}`);
  }

  leer(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  crear(model: {mantenimiento: Mantenimiento, grupoTarea: Array<any>}) {
    return this.http.post(`${this.API_URL}`, model);
  }

  /*eliminar(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  actualizar(id: number, updateModel: Array<any>) {
    return this.http.put(`${this.API_URL}/${id}`, updateModel);
  }*/
  
  // ############################################# Estado #############################################
 
  leerTodosEstado() {
    return this.http.get(`${this.API_URL}/estado`);
  }

  leerEstado(id: number) {
    return this.http.get(`${this.API_URL}/estado/${id}`);
  }

  crearEstado(model: EstadoMantenimiento) {
    return this.http.post(`${this.API_URL}/estado`, model);
  }

  eliminarEstado(id: number) {
    return this.http.delete(`${this.API_URL}/estado/${id}`);
  }

  actualizarEstado(id: number, updateModel: EstadoMantenimiento) {
    return this.http.put(`${this.API_URL}/estado/${id}`, updateModel);
  }

  // ############################################# Tipo #############################################
 
  leerTodosTipo() {
    return this.http.get(`${this.API_URL}/tipo`);
  }

  leerTipo(id: number) {
    return this.http.get(`${this.API_URL}/tipo/${id}`);
  }

  crearTipo(model: TipoMantenimiento) {
    return this.http.post(`${this.API_URL}/tipo`, model);
  }

  eliminarTipo(id: number) {
    return this.http.delete(`${this.API_URL}/tipo/${id}`);
  }

  actualizaTipo(id: number, updateModel: TipoMantenimiento) {
    return this.http.put(`${this.API_URL}/tipo/${id}`, updateModel);
  }

  // ############################################# Prioridad #############################################
 
  leerTodosPrioridad() {
    return this.http.get(`${this.API_URL}/prioridad`);
  }

  leerPrioridad(id: number) {
    return this.http.get(`${this.API_URL}/prioridad/${id}`);
  }

  crearPrioridad(model: PrioridadMantenimiento) {
    return this.http.post(`${this.API_URL}/prioridad`, model);
  }

  eliminarPrioridad(id: number) {
    return this.http.delete(`${this.API_URL}/prioridad/${id}`);
  }

  actualizaPrioridad(id: number, updateModel: PrioridadMantenimiento) {
    return this.http.put(`${this.API_URL}/prioridad/${id}`, updateModel);
  }

  // ############################################# Tarea #############################################
 
  leerTodosTarea() {
    return this.http.get(`${this.API_URL}/tarea`);
  }

  leerTarea(id: number) {
    return this.http.get(`${this.API_URL}/tarea/${id}`);
  }

  /**
   * Obtiene las tareas que estan vinculadas a un mantenimiento
   * @param id idmantenimiento
   */
  leerTareaGrupo(id: number) {
    return this.http.get(`${this.API_URL}/tarea/grupo/${id}`);
  }

  crearTarea(model: TareaMantenimiento) {
    return this.http.post(`${this.API_URL}/tarea`, model);
  }

  eliminarTarea(id: number) {
    return this.http.delete(`${this.API_URL}/tarea/${id}`);
  }

  actualizarTarea(id: number, updateModel: TareaMantenimiento) {
    return this.http.put(`${this.API_URL}/tarea/${id}`, updateModel);
  }

}
