import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(private asistenciaService: AsistenciaService,
    private modalImagenService: ModalImagenService) {
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarAsistencias();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarAsistencias());
  }

  cargarAsistencias() {
    this.cargando = true;
    this.asistenciaService.cargarAsistencias(this.desde)
      .subscribe(({ asistencias }) => {
        this.asistencias = asistencias;
        this.cargando = false;
      })
  }


  actualizarAsistencia() {
    if (this.formAsistencias.invalid) {
      return;
    }
    // Realizar el posteo
    this.asistenciaService.actualizarAsistencia(this.formAsistencias.value)
      .subscribe(resp => {
        if (resp.ok) {
          this.cargarAsistencias();
        } else {
          console.error(resp);
          Swal.fire('Error', resp.msg, 'error');
        }
        // Navegar al Asistencias
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
