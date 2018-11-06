import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class UsuarioPageService {
  usuarioList: AngularFireList<any>;
  usuario: Usuario = new Usuario();

  constructor(private firebase: AngularFireDatabase) {

   }

  getData() {

    this.usuarioList = this.firebase.list('usuarios');
    return this.usuarioList;
  }
}
