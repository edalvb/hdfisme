import { Injectable } from '@angular/core';

// Este modulo permite hacer peticiones Http
import { HttpClient } from '@angular/common/http';

import keys from '../utils/keys';

@Injectable({
  providedIn: 'root'
})
export class ResponsableFilterService {

  API_URL = `http://${keys.server.host}:${keys.server.port}/api`;

  constructor(private http: HttpClient) { }

  get(idbien: number) {
    return this.http.get(`${this.API_URL}/responsablefilter/${idbien}`);
  }

}
