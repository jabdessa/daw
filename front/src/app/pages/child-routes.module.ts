import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompeticionesComponent } from './competiciones/competiciones.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { AdminGuard } from '../guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { JuecesComponent } from './mantenimientos/jueces/jueces.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const childRoutes: Routes = [
  { path: '', component: CompeticionesComponent, data: { titulo: 'Competiciones' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},

  // Rutas de SEC : secretario
  { path: 'asistencias/:idCompeticion', canActivate: [AdminGuard], component: CompeticionesComponent, data: { titulo: 'Asistencias' } },
  // Rutas de Admin
  { path: 'jueces', canActivate: [AdminGuard], component: JuecesComponent, data: { titulo: 'Jueces' } },




  // FIXME delete todos sus componentes también borrar.
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de juez' } },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Matenimiento de Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Matenimiento de Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Matenimiento de Medicos' } },
]




@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
