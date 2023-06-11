import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Combo } from 'src/app/interfaces/combo.interface';
import { Competicion } from 'src/app/models/competicion.model';
import { CompeticionService } from 'src/app/services/competicion.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.scss']
})
export class CompeticionesComponent implements OnInit, OnDestroy {

  public displayModalCrear: boolean = false;

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

  comboOptions: Combo[] =
    [
      {
        id: 'JUEZ',
        value: 'Competicion'
      },
      {
        id: 'SEC',
        value: 'Secretario'
      }
    ];

  public competiciones: Competicion[] = [];
  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public formCompeticiones: FormGroup;

  constructor(private competicionService: CompeticionService,
    private fb: FormBuilder,
    private modalImagenService: ModalImagenService) {

    this.formCompeticiones = this.fb.group({
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


  abrirModalCrearCompeticion() {
    this.formCompeticiones.reset();
    this.displayModalCrear = true;
  }

}
