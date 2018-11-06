import { MesaCrud } from './mesa-crud.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class MesaCrudService {
  mesaCrudList: AngularFireList<any>;
  selectedMesaCrud: MesaCrud = new MesaCrud();

  constructor(private firebase: AngularFireDatabase ) {

   }

  getData() {
    this.mesaCrudList = this.firebase.list('mesas');
    return this.mesaCrudList;
  }

  insertMesaCrud(mesaCrud: MesaCrud) {

    if ( !this.mesaCrudList ) {
      this.mesaCrudList = this.getData();
    }
      this.mesaCrudList.push({
        nombre: mesaCrud.nombre,
        numero: mesaCrud.numero,
        estado: mesaCrud.estado
    });

  }

  updateMesaCrud(mesaCrud: MesaCrud) {
    this.mesaCrudList.update(mesaCrud.$key,
      {
        nombre: mesaCrud.nombre,
        numero: mesaCrud.numero,
        estado: mesaCrud.estado
      });
  }

  deleterol($key: string) {
    this.mesaCrudList.remove($key);
  }

}
