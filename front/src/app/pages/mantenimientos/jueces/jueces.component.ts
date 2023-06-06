import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Juez } from '../../../models/juez.model';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/interfaces/combo.interface';
import { JuezService } from '../../../services/juez.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-jueces',
  templateUrl: './jueces.component.html',
  styleUrls: ['./jueces.component.scss']
})
export class JuecesComponent implements OnInit, OnDestroy {

  public displayModalCrear: boolean = false;

  comboOptions: Combo[] =
    [
      {
        id: 'JUEZ',
        value: 'Juez'
      },
      {
        id: 'SEC',
        value: 'Secretario'
      }
    ];

  public totalJueces: number = 0;
  public jueces: Juez[] = [];
  public juezsTemp: Juez[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;
  public formJueces: FormGroup;

  constructor(private juezService: JuezService,
    private fb: FormBuilder,
    private modalImagenService: ModalImagenService) {

    this.formJueces = this.fb.group({
      nombre: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      segundoApellido: new FormControl(''),
      password: new FormControl('', Validators.required),
      passwordMatch: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      foto: new FormControl('')
    }, {
      validators: this.passwordsIguales('password', 'passwordMatch')
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarJueces();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarJueces());
  }

  cargarJueces() {
    this.cargando = true;
    this.juezService.cargarJueces(this.desde)
      .subscribe(({ total, jueces }) => {
        this.totalJueces = total;
        this.jueces = jueces;
        this.juezsTemp = jueces;
        this.cargando = false;
      })
  }

  eliminarJuez(juez: Juez) {
    if (juez.id === this.juezService.id) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar juez?',
      text: `Esta a punto de borrar a ${juez.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.juezService.eliminarJuez(juez)
          .subscribe(resp => {
            this.cargarJueces();
            Swal.fire(
              'Juez borrado',
              `${juez.nombre} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

  cambiarRole(juez: Juez) {
    this.juezService.guardarJuez(juez)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  crearJuez() {

    if (this.formJueces.invalid) {
      return;
    }

    // Realizar el posteo
    this.juezService.crearJuez(this.formJueces.value)
      .subscribe(resp => {
        this.displayModalCrear = false;
        if (resp.ok) {
          this.cargarJueces();
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
    console.log(this.formJueces.value);

  }


  abrirModal(juez: Juez) {
    this.modalImagenService.abrirModal('jueces', juez.id, juez.foto);
  }


  abrirModalCrearJuez() {
    this.formJueces.reset();
    this.displayModalCrear = true;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }


    }
  }
}
