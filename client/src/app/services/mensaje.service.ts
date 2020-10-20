import { Injectable } from '@angular/core';

//Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import { MensajeDestinatario } from '../models/Mensaje';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private _key = keys;

  API_URL = `http://${this._key.server.host}:${this._key.server.port}/api/mensaje`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los mensajes de usuario logeado con el usuario que sea destinatario.
   * @param idDestimataro id del destinatario
   */
  leerMisMensajesCon(idDestimataro: number) {
    return this.http.get(`${this.API_URL}/${idDestimataro}`);
  }

  nuevoMensajeCon(mensaje: {destinatario: number, mensaje: string}) {
    return this.http.post(`${this.API_URL}/`, mensaje);
  }

  borrarMensaje(idmensaje: number) {
    return this.http.delete(`${this.API_URL}/${idmensaje}`);
  }

  /**
   * Obtiene un array conteniendo objetos JSON (idusuario, usuario, idultimo_mensaje, ultimo_mensaje, fecha_ultimo_mensaje).
   * - Donde (idusuario y usuario) es el usuario con que se ha tenido conversación
   */
  obtenerMisUltimosMensajes() {
    return this.http.get(`${this.API_URL}/`);
  }

  leerTodosDestinatarios() {
    return this.http.get(`${this.API_URL}/enviar/destinatario`);
  }

}
