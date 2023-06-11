import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Asistencia } from 'src/app/models/asistencia.model';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.scss']
})
export class AsistenciasComponent implements OnInit, OnDestroy {

  public asistencias: Asistencia[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public formAsistencias: FormGroup;
  private idCompeticion: any;

  constructor(private asistenciaService: AsistenciaService, private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ idCompeticion }) => {

        this.idCompeticion = idCompeticion;
        this.cargarAsistencias(idCompeticion);
      });
  }

  cargarAsistencias(idCompeticion: any) {
    this.cargando = true;
    this.asistenciaService.cargarAsistencias(idCompeticion)
      .subscribe(({ asistencias }) => {
        this.asistencias = asistencias;
        this.cargando = false;
      })
  }



  actualizarAsistencia(event, asistencia: Asistencia) {
    const data = {
      asiste: event.checked,
      idAsitencia: asistencia.id,
    }

    this.asistenciaService.actualizarAsistencia(data)
      .subscribe(resp => {
        if (resp.ok) {
          this.cargarAsistencias(this.idCompeticion);
        } else {
          console.error(resp);
          Swal.fire('Error', resp.msg, 'error');
        }
        // Navegar al Competiciones
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


}
