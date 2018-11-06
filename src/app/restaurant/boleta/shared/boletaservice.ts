import { VentaBoleta } from './../../lista-menu/shared/ventaBoleta.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Boleta } from './boleta.model';
import { VentaSeleccionada } from '../../lista-menu/shared/venta.model';
import { BoletaFinal } from './boletaFinal.model';
import { DatePipe } from '@angular/common';


@Injectable()
export class BoletaService {
  boletaList: AngularFireList<any>;
  selectedBoleta: BoletaFinal = new BoletaFinal();
  venta: VentaBoleta = new VentaBoleta();


  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe ) {


   }

   getDataRequest( fecha: string) {
     debugger;
    this.boletaList = this.firebase.list(fecha + '_' + 'boleta');
    return this.boletaList;
  }

  getData() {
    const date = new Date();
    const fecha = this.datePipe.transform(date, 'yyyy_MM_dd');
    this.boletaList = this.firebase.list(fecha + '_' + 'boleta');
    return this.boletaList;
  }

  insertBoleta(boleta: Boleta) {
    debugger;
    if (!this.boletaList) {
      this.boletaList = this.getData();
    }
    this.venta = new VentaBoleta();
    this.venta.cartaList = boleta.venta.cartaList;
    this.venta.codigoMesa = boleta.venta.codigoMesa;
    this.venta.mesa = boleta.venta.mesa;
    this.venta.codigoMozo = boleta.venta.codigoMozo;
    this.venta.mozo = boleta.venta.mozo;
    this.venta.fecha = boleta.venta.fecha;
    this.venta.estado = boleta.venta.estado;
    this.venta.key = boleta.venta.$key;
    this.venta.id = boleta.venta.id;
    if (boleta.codigoElectronico === undefined) {
        boleta.codigoElectronico = '';
    }

    const date = new Date();


      this.boletaList.push({
        venta: this.venta,
        total: boleta.total,
        totalPlatos: boleta.totalPlatos,
        estado: boleta.estado,
        mesa: boleta.mesa,
        codigoMesa: boleta.codigoMesa,
        codigoElectronico: boleta.codigoElectronico,
        fecha: this.datePipe.transform(date, 'yyyy-MM-dd'),
        fechaHora: this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'),
        rucCliente: boleta.rucCliente,
        nombreCliente: boleta.nombreCliente,
        tipoDocumento: boleta.tipoDocumento
      });

  }

  updateCarta(boleta: Boleta) {
    if (boleta.codigoElectronico === undefined) {
      boleta.codigoElectronico = '';
  }
    this.boletaList.update(boleta.$key,
      {
        venta: boleta.venta,
        total: boleta.total,
        totalPlatos: boleta.totalPlatos,
        estado: boleta.estado,
        mesa: boleta.mesa,
        codigoMesa: boleta.codigoMesa,
        codigoElectronico: boleta.codigoElectronico
      });
  }

  deleteCarta($key: string) {
    this.boletaList.remove($key);
  }

}
