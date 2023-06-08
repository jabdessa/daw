import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { CargarCompeticion } from '../interfaces/cargar-competiciones.interface';

// import { CompeticionRegister } from '../interfaces/competicion.interface';
// import { responseCompeticiones } from '../interfaces/response-competiciones.interface';
import { Competicion } from '../models/competicion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  public competicion: Competicion;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // TODO 
  // crearCompeticion(formData: CompeticionRegister): Observable<responseCompeticiones> {
  //   return this.http.post<responseCompeticiones>(`${base_url}/competiciones`, formData, this.headers);
  // }

  cargarCompeticiones(desde: number = 0) {
    const url = `${base_url}/competiciones?desde=${desde}`;
    return this.http.get<CargarCompeticion>(url, this.headers)
      .pipe(
        map(resp => {
          const competiciones = resp.competiciones.map(
            competicion => new Competicion(competicion.nombre, competicion.lugar, competicion.fecha, competicion.jornada, competicion.organizador, competicion.horario, competicion.id)
          );
          return {
            total: resp.total,
            competiciones
          };
        })
      )
  }

  eliminarCompeticion(competicion: Competicion) {
    const url = `${base_url}/competiciones/${competicion.id}`;
    return this.http.delete(url, this.headers);
  }

  actualizarCompeticion(competicion: Competicion) {
    return this.http.put(`${base_url}/competiciones/${competicion.id}`, competicion, this.headers);
  }

}
