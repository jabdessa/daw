import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CargarAsistencia } from '../interfaces/cargar-asistencias.interface';
import { Asistencia } from '../models/asistencia.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

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

  // crear eliminar disponiblidad/asistencia juez
  crearAsistencia(formData: any): Observable<any> {
    return this.http.post<any>(`${base_url}/asistencias`, formData, this.headers);
  }

  cargarAsistencias( idCompeticion:any) {
    const url = `${base_url}/asistencias/competicion/${idCompeticion}`;
    return this.http.get<CargarAsistencia>(url, this.headers)
      .pipe(
        map(resp => {
          const asistencias = resp.asistencias.map(
            asistencia => new Asistencia(asistencia.competicion, asistencia.juez, asistencia.asiste, asistencia.id)
          );
          return {
            ok: resp.ok,
            asistencias
          };
        })
      )
  }

  actualizarAsistencia(asistencia: any): Observable<any> {
    return this.http.put<any>(`${base_url}/asistencias`, asistencia, this.headers);
  }

}
