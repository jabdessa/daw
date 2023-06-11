import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JuezService } from '../services/juez.service';

@Injectable({
  providedIn: 'root'
})
export class SecJuezGuard implements CanActivate {

  constructor(private juezService: JuezService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (['SEC','JUEZ'].includes(this.juezService.role)) {
      return true;
    } else {
      this.router.navigateByUrl('/jueces');
      return false;
    }

    // return (this.juezService.role === 'ADMIN') ? true : false;

  }

}
