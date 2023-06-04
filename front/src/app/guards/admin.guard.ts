import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JuezService } from '../services/juez.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private juezService: JuezService,
               private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if (this.juezService.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigateByUrl('/competiciones');
        return false;
      }

      // return (this.juezService.role === 'ADMIN') ? true : false;

  }
  
}
