import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarJuez } from '../interfaces/cargar-jueces.interface';

import { Juez } from '../models/juez.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class JuezService {

  // public auth2: any;
  public juez: Juez;

  constructor(private http: HttpClient,
    private router: Router,
    // private ngZone: NgZone
  ) {

    // this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN' | 'JUEZ' | 'SEC' {
    return this.juez.role;
  }

  get uid(): string {
    return this.juez.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // googleInit() {

  // return new Promise( resolve => {
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //     });

  //     resolve();
  //   });
  // })

  // }

  guardarLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');

    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/login');
    //   })
    // });

  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.juez;
        this.juez = new Juez(nombre, email, '', img, google, role, uid);

        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError(error => of(false))
    );

  }


  crearJuez(formData: RegisterForm) {

    return this.http.post(`${base_url}/jueces`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      )

  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.juez.role
    }

    return this.http.put(`${base_url}/jueces/${this.uid}`, data, this.headers);

  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );

  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );

  }


  cargarJueces(desde: number = 0) {

    const url = `${base_url}/jueces?desde=${desde}`;
    return this.http.get<CargarJuez>(url, this.headers)
      .pipe(
        map(resp => {
          const jueces = resp.jueces.map(
            user => new Juez(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
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
    const url = `${base_url}/jueces/${juez.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarJuez(juez: Juez) {

    return this.http.put(`${base_url}/jueces/${juez.uid}`, juez, this.headers);

  }

}
