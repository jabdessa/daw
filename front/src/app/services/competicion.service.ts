import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CargarCompeticion } from '../interfaces/cargar-competiciones.interface';
import { Competicion } from '../models/competicion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

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

  crearCompeticion(formData: any): Observable<any> {
    return this.http.post<any>(`${base_url}/competiciones`, formData, this.headers);
  }

  cargarCompeticiones(desde: number = 0) {
    const url = `${base_url}/competiciones?desde=${desde}`;
    return this.http.get<CargarCompeticion>(url, this.headers)
      .pipe(
        map(resp => {
          const competiciones = resp.competiciones.map(
            competicion => new Competicion(competicion.nombre, competicion.lugar, competicion.fecha, competicion.jornada, competicion.organizador, competicion.horario, competicion._id, competicion.disponibilidad)
          );
          return {
            ok: resp.ok,
            competiciones
          };
        })
      )
  }

  eliminarCompeticion(competicion: Competicion) {
    const url = `${base_url}/competiciones/${competicion._id}`;
    return this.http.delete(url, this.headers);
  }

  actualizarCompeticion(competicion: Competicion):Observable<any> {
    return this.http.put<any>(`${base_url}/competiciones/${competicion._id}`, competicion, this.headers);
  }

}
