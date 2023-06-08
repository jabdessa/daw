// FIXME  DELETE COMMENTED CODE 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';

import { JuezRegister } from '../interfaces/juez.interface';
import { responseJueces } from '../interfaces/response-jueces.interface';
import { Juez } from '../models/juez.model';
import { CargarJuez } from '../interfaces/cargar-jueces.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JuezService {

  public juez: Juez;

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN' | 'JUEZ' | 'SEC' {
    return this.juez.role;
  }

  get id(): string {
    return this.juez.id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, primerApellido, segundoApellido, email, role, foto, id, password, resetPassword } = resp.juez;
        this.juez = new Juez(nombre, primerApellido, segundoApellido, email, role, foto, id, '', resetPassword);
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearJuez(formData: JuezRegister): Observable<responseJueces> {
    return this.http.post<responseJueces>(`${base_url}/jueces`, formData, this.headers);
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.juez.role
    }
    return this.http.put(`${base_url}/jueces/${this.id}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );
  }

  cargarJueces(desde: number = 0) {
    // FIXME 
    const url = `${base_url}/jueces?desde=${desde}`;
    return this.http.get<CargarJuez>(url, this.headers)
      .pipe(
        map(resp => {
          const jueces = resp.jueces.map(
            // FIXME 
            juez => new Juez(juez.nombre, juez.primerApellido, juez.segundoApellido, juez.email, juez.role, juez.foto, juez.id)
          );
          return {
            total: resp.total,
            jueces
          };
        })
      )
  }

  eliminarJuez(juez: Juez) {

    // /jueces/5eff3c5054f5efec174e9c84
    const url = `${base_url}/jueces/${juez.id}`;
    return this.http.delete(url, this.headers);
  }

  guardarJuez(juez: Juez) {
    return this.http.put(`${base_url}/jueces/${juez.id}`, juez, this.headers);
  }

}
