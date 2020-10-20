import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { 
  IncidenteTipo, 
  IncidenteEstado, 
  IncidenteGravedad, 
  IncidenteSolucion,
  Incidente } from '../models/Incidente';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api/incidente`;


  constructor(private http: HttpClient) { }

  // INCIDENTE

  leerTodos() {
    return this.http.get(`${this.API_URL}`);
  }
/*
  leer(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
*/
  guardar(modelo: Incidente) {
    return this.http.post(`${this.API_URL}`, modelo);
  }
/*
  actualizar(id: number, updateModelo: Incidente) {
    return this.http.put(`${this.API_URL}/${id}`, updateModelo);
  }*/

  // TIPO

  leerTodosTipo() {
    return this.http.get(`${this.API_URL}/tipo`);
  }

  leerTipo(id: number) {
    return this.http.get(`${this.API_URL}/tipo/${id}`);
  }

  eliminarTipo(id: number) {
    return this.http.delete(`${this.API_URL}/tipo/${id}`);
  }

  guardarTipo(modelo: IncidenteTipo) {
    return this.http.post(`${this.API_URL}/tipo`, modelo);
  }

  actualizarTipo(id: number, updateModelo: IncidenteTipo) {
    return this.http.put(`${this.API_URL}/tipo/${id}`, updateModelo);
  }

  // ESTADOS

  leerTodosEstado() {
    console.log('Hello')
    return this.http.get(`${this.API_URL}/estado`);
  }

  leerEstado(id: number) {
    return this.http.get(`${this.API_URL}/estado/${id}`);
  }

  guardarEstado(modelo: IncidenteEstado) {
    return this.http.post(`${this.API_URL}/estado`, modelo);
  }

  eliminarEstado(id: number) {
    return this.http.delete(`${this.API_URL}/estado/${id}`);
  }

  actualizarEstado(id: number, updateModelo: IncidenteEstado) {
    return this.http.put(`${this.API_URL}/estado/${id}`, updateModelo);
  }

  // GRAVEDAD

  leerTodosGravedad() {
    return this.http.get(`${this.API_URL}/gravedad`);
  }

  leerGravedad(id: number) {
    return this.http.get(`${this.API_URL}/gravedad/${id}`);
  }

  guardarGravedad(bien: IncidenteGravedad) {
    return this.http.post(`${this.API_URL}/gravedad`, bien);
  }

  eliminarGravedad(id: number) {
    return this.http.delete(`${this.API_URL}/gravedad/${id}`);
  }

  actualizarGravedad(id: number, updateModelo: IncidenteGravedad) {
    return this.http.put(`${this.API_URL}/gravedad/${id}`, updateModelo);
  }

  // SOLUCION

  leerTodosSolucion() {
    return this.http.get(`${this.API_URL}/solucion`);
  }

  leerSolucion(id: number) {
    return this.http.get(`${this.API_URL}/solucion/${id}`);
  }

  guardarSolucion(bien: IncidenteSolucion) {
    return this.http.post(`${this.API_URL}/solucion`, bien);
  }

  eliminarSolucion(id: number) {
    return this.http.delete(`${this.API_URL}/solucion/${id}`);
  }

  actualizarSolucion(id: number, updateModelo: IncidenteSolucion) {
    return this.http.put(`${this.API_URL}/solucion/${id}`, updateModelo);
  }

}
