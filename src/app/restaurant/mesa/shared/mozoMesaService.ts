import { MozoMesa } from './mozo-mesa.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class MozoMesaService {

  mozoMesaList: AngularFireList<any>;
  selectedMozoMesa: MozoMesa = new MozoMesa();


  constructor(private firebase: AngularFireDatabase ) {


   }

  getData() {
    this.mozoMesaList = this.firebase.list('mozomesa');
    return this.mozoMesaList;
  }

  insertMozoMesa(mozoMesa: MozoMesa) {

    if ( !this.mozoMesaList) {
      this.mozoMesaList = this.getData();
    }
      this.mozoMesaList.push({
        codigoMesa: mozoMesa.codigoMesa,
        mesa: mozoMesa.mesa,
        codigoMozo: mozoMesa.codigoMozo,
        mozo: mozoMesa.mozo,
        fecha: mozoMesa.fecha,
        estado: mozoMesa.estado
    });


  }

  updateMozoMesa(mozoMesa: MozoMesa) {
    this.mozoMesaList.update(mozoMesa.$key,
      {
        codigoMesa: mozoMesa.codigoMesa,
        mesa: mozoMesa.mesa,
        codigoMozo: mozoMesa.codigoMozo,
        mozo: mozoMesa.mozo,
        fecha: mozoMesa.fecha,
        estado: mozoMesa.estado
      });
  }

  deleteMozoMesa($key: string) {
    this.mozoMesaList.remove($key);
  }

}
