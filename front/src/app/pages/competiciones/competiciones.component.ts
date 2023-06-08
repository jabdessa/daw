import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/interfaces/combo.interface';
import { Competicion } from 'src/app/models/competicion.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { CompeticionService } from 'src/app/services/competicion.service';

@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.scss']
})
export class CompeticionesComponent implements OnInit, OnDestroy {

  public displayModalCrear: boolean = false;

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

  public totalCompeticiones: number = 0;
  public competiciones: Competicion[] = [];
  public competicionsTemp: Competicion[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public formCompeticiones: FormGroup;

  constructor(private competicionService: CompeticionService,
    private fb: FormBuilder,
    private modalImagenService: ModalImagenService) {

    this.formCompeticiones = this.fb.group({
      nombre: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      segundoApellido: new FormControl(''),
      password: new FormControl('', Validators.required),
      passwordMatch: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      foto: new FormControl('')
    }, {
      // validators: this.passwordsIguales('password', 'passwordMatch')
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
      .subscribe(({ total, competiciones }) => {
        this.totalCompeticiones = total;
        this.competiciones = competiciones;
        this.competicionsTemp = competiciones;
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

  //   if (this.formCompeticiones.invalid) {
  //     return;
  //   }

    // Realizar el posteo
  //   this.competicionService.crearCompeticion(this.formCompeticiones.value)
  //     .subscribe(resp => {
  //       this.displayModalCrear = false;
  //       if (resp.ok) {
  //         this.cargarCompeticiones();
  //       } else {
  //         console.error(resp);
  //         Swal.fire('Error', resp.msg, 'error');
  //       }
  //       // Navegar al Competiciones
  //     }, (err) => {
  //       this.displayModalCrear = false;
  //       // Si sucede un error
  //       Swal.fire('Error', err.error.msg, 'error');

  //     });
  //   console.log(this.formCompeticiones.value);

  }


  abrirModalCrearCompeticion() {
    this.formCompeticiones.reset();
    this.displayModalCrear = true;
  }

  // passwordsIguales(pass1Name: string, pass2Name: string) {

  //   return (formGroup: FormGroup) => {

  //     const pass1Control = formGroup.get(pass1Name);
  //     const pass2Control = formGroup.get(pass2Name);

  //     if (pass1Control.value === pass2Control.value) {
  //       pass2Control.setErrors(null)
  //     } else {
  //       pass2Control.setErrors({ noEsIgual: true })
  //     }


  //   }
  // }
}
