import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { JuezService } from '../../services/juez.service';

import { Juez } from '../../models/juez.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public juez: Juez;

  constructor( public sidebarService: SidebarService,
               private juezService: JuezService) {
    this.juez = juezService.juez;
  }

  ngOnInit(): void {
  }

}
