import { CartaSeleccionada } from './cartaSeleccionada.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class CartaSeleccionadaService {
  cartaList: AngularFireList<any>;
  selectedCarta: CartaSeleccionada = new CartaSeleccionada();


  constructor(private firebase: AngularFireDatabase ) {


   }

  getData() {
    this.cartaList = this.firebase.list('cartaSeleccionada');
    return this.cartaList;
  }

  insertCarta(carta: CartaSeleccionada) {

    if (!this.cartaList) {
      this.cartaList = this.getData();
    }
      this.cartaList.push({
        dia: carta.dia,
        plato: carta.plato,
        categoria: carta.categoria,
        precio: carta.precio,
        descripcion: carta.categoria,
        codigoDia: carta.codigoDia,
        codigoMenu: carta.codigoMenu,
        codigoCategoria: carta.codigoCategoria,
        contadorPositivo:  carta.contadorPositivo,
        contadorNegativo: carta.contadorNegativo
      });

  }

  updateCarta(carta: CartaSeleccionada) {
    this.cartaList.update(carta.$key,
      {
        dia: carta.dia,
        plato: carta.plato,
        categoria: carta.categoria,
        precio: carta.precio,
        descripcion: carta.categoria,
        codigoDia: carta.codigoDia,
        codigoMenu: carta.codigoMenu,
        codigoCategoria: carta.codigoCategoria,
        contadorPositivo:  carta.contadorPositivo,
        contadorNegativo: carta.contadorNegativo
      });
  }

  deleteCarta($key: string) {
    this.cartaList.remove($key);
  }

}
