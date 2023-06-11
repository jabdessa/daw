import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  // public Asistencia: Asistencia;

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

  // cargarAsistencias(desde: number = 0) {
  //   const url = `${base_url}/Asistencias?desde=${desde}`;
  //   return this.http.get<CargarAsistencia>(url, this.headers)
  //     .pipe(
  //       map(resp => {
  //         const Asistencias = resp.Asistencias.map(
  //           Asistencia => new Asistencia(Asistencia.nombre, Asistencia.lugar, Asistencia.fecha, Asistencia.jornada, Asistencia.organizador, Asistencia.horario, Asistencia._id, Asistencia.disponibilidad)
  //         );
  //         return {
  //           ok: resp.ok,
  //           Asistencias
  //         };
  //       })
  //     )
  // }

  // eliminarAsistencia(Asistencia: Asistencia) {
  //   const url = `${base_url}/Asistencias/${Asistencia._id}`;
  //   return this.http.delete(url, this.headers);
  // }

  // actualizarAsistencia(Asistencia: Asistencia):Observable<any> {
  //   return this.http.put<any>(`${base_url}/Asistencias/${Asistencia._id}`, Asistencia, this.headers);
  // }

}
