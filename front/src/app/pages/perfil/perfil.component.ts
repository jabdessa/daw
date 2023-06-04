import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { JuezService } from '../../services/juez.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Juez } from '../../models/juez.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public juez: Juez;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private juezService: JuezService,
               private fileUploadService: FileUploadService) {
    
    this.juez = juezService.juez;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.juez.nombre , Validators.required ],
      email: [ this.juez.email, [ Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil() {
    this.juezService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.juez.nombre = nombre;
          this.juez.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }


  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'jueces', this.juez.id )
      .then( foto => {
        this.juez.foto = foto;
        Swal.fire('Guardado', 'Imagen de juez actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
