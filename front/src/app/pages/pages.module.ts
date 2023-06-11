import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { PipesModule } from '../pipes/pipes.module';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { CompeticionesComponent } from './competiciones/competiciones.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { JuecesComponent } from './mantenimientos/jueces/jueces.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AsistenciasComponent } from './asistencias/asistencias.component';

@NgModule({
  declarations: [
    CompeticionesComponent,
    AsistenciasComponent,
    AccountSettingsComponent,
    PagesComponent,
    PerfilComponent,
    JuecesComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
  ],
  exports: [
    CompeticionesComponent,
    PagesComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
