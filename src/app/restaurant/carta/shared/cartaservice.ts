import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Carta } from './carta.model';

@Injectable()
export class CartaService {
  cartaList: AngularFireList<any>;
  selectedCarta: Carta = new Carta();


  constructor(private firebase: AngularFireDatabase ) {


   }

  getData() {
    this.cartaList = this.firebase.list('carta');
    return this.cartaList;
  }

  insertCarta(carta: Carta) {

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

  updateCarta(carta: Carta) {
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

  deleteCarta(carta: Carta) {
    this.cartaList.remove(carta.$key);
  }

}
