import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Competicion } from 'src/app/models/competicion.model';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { CompeticionService } from 'src/app/services/competicion.service';
import { JuezService } from 'src/app/services/juez.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.scss']
})
export class CompeticionesComponent implements OnInit, OnDestroy {

  public displayModalCrear: boolean = false;
  public displayModalActualizar: boolean = false;
  juezRole = this.juezService.role;
  juezId = this.juezService.id;

  locale: {
    primeng: {
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'desembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  public competiciones: Competicion[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public formCompeticiones: FormGroup;

  constructor(private competicionService: CompeticionService,
    private juezService: JuezService,
    private asistenciaService: AsistenciaService,
    private fb: FormBuilder,
    private modalImagenService: ModalImagenService) {

    this.formCompeticiones = this.fb.group({
      _id: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      fecha: new FormControl(''),
      jornada: new FormControl(''),
      organizador: new FormControl(''),
      horario: new FormControl(''),
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCompeticiones();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarCompeticiones());
  }

  cargarCompeticiones() {
    this.cargando = true;
    this.competicionService.cargarCompeticiones(this.desde)
      .subscribe(({ competiciones }) => {
        this.competiciones = competiciones;
        this.cargando = false;
      })
  }

  eliminarCompeticion(competicion: Competicion) {

    Swal.fire({
      title: '¿Borrar competicion?',
      text: `Esta a punto de borrar a ${competicion.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarla'
    }).then((result) => {
      if (result.value) {

        this.competicionService.eliminarCompeticion(competicion)
          .subscribe(resp => {
            this.cargarCompeticiones();
            Swal.fire(
              'Competicion borrada',
              `${competicion.nombre} fue eliminada correctamente`,
              'success'
            );
          });
      }
    })
  }

  crearCompeticion() {
    if (this.formCompeticiones.invalid) {
      return;
    }
    // Realizar el posteo
    this.competicionService.crearCompeticion(this.formCompeticiones.value)
      .subscribe(resp => {
        this.displayModalCrear = false;
        if (resp.ok) {
          this.cargarCompeticiones();
        } else {
          console.error(resp);
          Swal.fire('Error', resp.msg, 'error');
        }
        // Navegar al Competiciones
      }, (err) => {
        this.displayModalCrear = false;
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  actualizarCompeticion() {
    if (this.formCompeticiones.invalid) {
      return;
    }
    // Realizar el posteo
    this.competicionService.actualizarCompeticion(this.formCompeticiones.value)
      .subscribe(resp => {
        this.displayModalActualizar = false;
        if (resp.ok) {
          this.cargarCompeticiones();
        } else {
          console.error(resp);
          Swal.fire('Error', resp.msg, 'error');
        }
        // Navegar al Competiciones
      }, (err) => {
        this.displayModalActualizar = false;
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  abrirModalCrearCompeticion() {
    this.formCompeticiones.reset();
    this.displayModalCrear = true;
  }

  abrirModalModificarCompeticion(competicion: Competicion) {
    competicion.fecha = competicion.fecha ? new Date(competicion.fecha) : null;
    this.formCompeticiones.patchValue(competicion);
    this.displayModalActualizar = true;
  }

  checkDisponibilidadJuez(competicion: Competicion): boolean {
    const asistencias = competicion?.disponibilidad.filter((dispo: any) => dispo?.juez == this.juezService.id).
      map((dispo: any) => dispo?.juez) || [];
    return asistencias.includes(this.juezService.id);
  }

  checkAsistenciaJuez(competicion: Competicion): boolean {
    const asistencia = competicion?.disponibilidad.filter((dispo: any) => dispo?.juez == this.juezService.id) || [];
    if (asistencia[0]) {
      return asistencia[0]['asiste'];
    }
    return false;
  }

  juezDisponible(event, competicion: Competicion) {
    const data = {
      disponible: event.checked,
      competicion: competicion._id,
      juez: this.juezService.id
    }

    this.asistenciaService.crearAsistencia(data)
      .subscribe(resp => {
        if (resp.ok) {
          this.cargarCompeticiones();
        } else {
          console.error(resp);
          Swal.fire('Error', resp.msg, 'error');
        }
        // Navegar al Competiciones
      }, (err) => {
        this.displayModalCrear = false;
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
