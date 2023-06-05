import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Juez } from '../../../models/juez.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { JuezService } from '../../../services/juez.service';
import { Subscription } from 'rxjs';
import { Combo } from 'src/app/interfaces/combo.interface';

@Component({
  selector: 'app-jueces',
  templateUrl: './jueces.component.html',
  styles: [
  ]
})
export class JuecesComponent implements OnInit, OnDestroy {

  comboOptions: Combo[] =
    [
      {
        id: 'SEC',
        value: 'Secretario'
      },
      {
        id: 'JUEZ',
        value: 'Juez'
      }
    ];

  public totalJueces: number = 0;
  public jueces: Juez[] = [];
  public juezsTemp: Juez[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private juezService: JuezService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService) { }
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

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalJueces) {
      this.desde -= valor;
    }

    this.cargarJueces();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.jueces = this.juezsTemp;
    }

    this.busquedasService.buscar('jueces', termino)
      .subscribe((resp: Juez[]) => {

        this.jueces = resp;

      });
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


  abrirModal(juez: Juez) {

    this.modalImagenService.abrirModal('jueces', juez.id, juez.foto);
  }

}
