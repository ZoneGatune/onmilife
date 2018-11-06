import { CierreCaja } from './cierre-caja.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class CierreCajaService {
  cierreCajaList: AngularFireList<any>;
  cierreCaja: CierreCaja = new CierreCaja();

  constructor(private firebase: AngularFireDatabase ) {

   }

  getData() {
    this.cierreCajaList = this.firebase.list('cierrecaja');
    return this.cierreCajaList;
  }

  insertCierreCaja(boleta: CierreCaja) {
      this.cierreCajaList.update(boleta.codigo,
        {
          estado: boleta.estado
        });
  }

  updateCierreCaja(boleta: CierreCaja) {
    this.cierreCajaList.update(boleta.codigo,
      {
        estado: boleta.estado
      });
  }
}
