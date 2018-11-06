
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { VentaSeleccionada } from './venta.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VentaSeleccionadaService {
  ventaList: AngularFireList<any>;
  ventaArrayList: AngularFireList<VentaSeleccionada>;
  selectedVenta: VentaSeleccionada = new VentaSeleccionada();


  constructor(private firebase: AngularFireDatabase ) {


   }

  getData() {
    this.ventaList = this.firebase.list('ventas');
    return this.ventaList;
  }

  insertVenta(venta: VentaSeleccionada):  string {

    if (!this.ventaList) {
      this.ventaList = this.getData();
    }
      const objKey = this.ventaList.push({
        id: venta.id,
        estado: venta.estado,
        fecha: venta.fecha,
        cartaList: venta.cartaList,
        mozo: venta.mozo,
        codigoMozo: venta.codigoMozo,
        mesa: venta.mesa,
        codigoMesa: venta.codigoMesa
      });
      const newKey = objKey.key;
      return newKey;
  }

  updateVenta(ventaKey: string, venta: VentaSeleccionada) {
    debugger;

    //const list = this.firebase.object(`https://restaurante1-6523c.firebaseio.com/ventas/` + ventaKey).set(venta);

    this.ventaList.update(ventaKey,
      {
        id: venta.id,
        estado: venta.estado,
        fecha: venta.fecha,
        cartaList: venta.cartaList
      });
  }

  deleteVenta($key: string) {
    this.ventaList.remove($key);
  }
}
