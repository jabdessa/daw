import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from './shared/locale/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jueces';
  private locale = new Locale();

  constructor(
    private primengConfig: PrimeNGConfig,
  ) {
    // traducciones para el primeng
    this.primengConfig.setTranslation(this.locale.getEs().primeng);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
