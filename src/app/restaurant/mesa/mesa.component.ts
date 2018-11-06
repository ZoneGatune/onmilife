import { VentaSeleccionada } from './../lista-menu/shared/venta.model';
import { VentaSeleccionadaService } from './../lista-menu/shared/ventaService';
import { Menu } from './../plato/shared/menu.model';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { MesaCrud } from '../mesa-crud/shared/mesa-crud.model';
import { MesaCrudService } from '../mesa-crud/shared/mesaCrudService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado/shared/empleado.model';
import { MozoMesaService } from './shared/mozoMesaService';
import { MozoMesa } from './shared/mozo-mesa.model';
import * as moment from 'moment/moment';
import { ErrorStateMatcher } from "@angular/material/core";
import {formatDate } from '@angular/common';
import { Carta } from '../carta/shared/carta.model';
import { Carta1 } from '../carta/shared/carta1.model';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
  providers: [MozoMesaService]
})
export class MesaComponent implements OnInit {

  today = new Date();
  mesaCrudList: MesaCrud[];
  mozoMesaList: MozoMesa[];
  empleado: Empleado = new Empleado();
  mozoMesa: MozoMesa = new MozoMesa();
  venta: VentaSeleccionada = new VentaSeleccionada();
  mesaEncontrada: MesaCrud = new MesaCrud();
  cartaList: Carta1[];
  ventasEnLinea:  VentaSeleccionada[];

  loadCartaDefecto() {
    this.cartaList = [];

  }


  constructor(private mesaCrudService: MesaCrudService,
    public router: Router,
    private mozoMesaService: MozoMesaService,
    private route: ActivatedRoute,
    private ventaService: VentaSeleccionadaService) { }

  ngOnInit() {
    debugger;
    this.loadCartaDefecto();
    console.log(this.route.queryParams);
    this.route.queryParams
    .subscribe(params => {
      debugger;
      const e = new Empleado();
      Object.assign(e, params);
      this.empleado = e;
      const mozo =  params['mozo'];
      const codigoMozo =  params['codigoMozo'];
      if(mozo !== undefined) {
        this.empleado.nombre = mozo;
        this.empleado.username = codigoMozo;
      }


    });

    const x = this.mesaCrudService.getData();
    x.snapshotChanges().subscribe(item => {
      this.mesaCrudList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.mesaCrudList.push(y as MesaCrud);
      });

    });
  }

  mozoMesaOcupadasList: MozoMesa[];

  private OnclickMesa(mesa: string) {
    debugger;
    const x = this.ventaService.getData();
      x.snapshotChanges().subscribe(item => {
        this.ventasEnLinea = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.ventasEnLinea.push(y as VentaSeleccionada);

        });

        debugger;
        this.venta = this.ventasEnLinea.find( x => x.codigoMesa === mesa);
        debugger;

    // if (this.venta === undefined) {
    //   debugger;
    //   this.router.navigate(['/auth/restaurant/mesa'], {
    //   queryParams: {'ventaKey': this.venta.$key,
    //                 'codigoMesa': this.venta.codigoMesa,
    //                 'mesa': this.venta.mesa,
    //                 'mozo': this.venta.mozo,
    //                 'codigoMozo': this.venta.codigoMozo } });
    // }

    if (this.venta) {


        debugger;
        this.router.navigate(['/auth/restaurant/listaMenu'], {
          queryParams: {'ventaKey': this.venta.$key,
                        'codigoMesa': this.venta.codigoMesa,
                        'mesa': this.venta.mesa,
                        'mozo': this.venta.mozo,
                        'codigoMozo': this.venta.codigoMozo } });

      } else {
      this.mesaEncontrada = this.mesaCrudList.find( x => x.numero === mesa);
      this.mesaEncontrada.estado = 'ocupado';
      this.mozoMesa.codigoMesa = this.mesaEncontrada.numero;
      this.mozoMesa.mesa = this.mesaEncontrada.nombre;
      this.mozoMesa.codigoMozo = this.empleado.username;
      this.mozoMesa.mozo = this.empleado.nombre;
      this.mozoMesa.estado = this.mesaEncontrada.estado;

      this.mesaCrudService.updateMesaCrud(this.mesaEncontrada);
      this.mozoMesa.fecha = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-ES', 'UTC -5');
      //this.mozoMesaService.insertMozoMesa(this.mozoMesa);
      debugger;
      this.venta  = new VentaSeleccionada();

      debugger;
      this.venta.estado = 'activado';
      this.venta.fecha = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-ES', 'UTC -5');
      this.venta.id = '001';
      this.venta.cartaList = new Array<Carta1>();
      this.venta.codigoMesa = this.mozoMesa.codigoMesa;
      this.venta.mesa = this.mozoMesa.mesa;
      this.venta.mozo = this.mozoMesa.mozo;
      this.venta.codigoMozo = this.mozoMesa.codigoMozo;
      // this.venta.cartaList =  this.cartaList;
      const keyVenta = this.ventaService.insertVenta(this.venta);


      this.router.navigate(['/auth/restaurant/listaMenu'], {
        queryParams: {'ventaKey': keyVenta,
                      'codigoMesa': this.mozoMesa.codigoMesa,
                      'mesa': this.mozoMesa.mesa,
                      'mozo': this.mozoMesa.mozo,
                      'codigoMozo': this.mozoMesa.codigoMozo } });

    }

      });
        // debugger; this.menuObj = this.menuList.find( x => x.codigoMenu === this.carta.codigoMenu);

    // this.router.navigate(['/auth/guarded-routes/', { outlets: { popup: [ 'example' ] }}]);
  }

}

