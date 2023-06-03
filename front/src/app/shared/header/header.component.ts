import { Component } from '@angular/core';
import { JuezService } from '../../services/juez.service';
import { Juez } from '../../models/juez.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public juez: Juez;

  constructor( private juezService: JuezService,
               private router: Router ) {
    this.juez = juezService.juez;
  }

  logout() {
    this.juezService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

}
