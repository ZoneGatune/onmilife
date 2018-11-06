import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { DatePipe } from '@angular/common';

@Injectable()
export class UsuarioService {
  usuarioList: AngularFireList<any>;
  usuario: Usuario = new Usuario();

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe ) {

   }

  getData() {

    this.usuarioList = this.firebase.list('usuarios');
    return this.usuarioList;
  }
}
