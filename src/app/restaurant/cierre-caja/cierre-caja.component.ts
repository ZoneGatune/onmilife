import { CierreCaja } from './shared/cierre-caja.model';
import { CierreCajaService } from './shared/cierrecajaservice';
import { MenuService } from './../plato/shared/menuservice';
import { Menu } from './../plato/shared/menu.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.scss']
})
export class CierreCajaComponent implements OnInit {

  constructor(private menuService: MenuService, private cierreCajaService: CierreCajaService , private tostr: ToastrService) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  cierreCajaList: CierreCaja[];
  matcher = new MyErrorStateMatcher();
  menu: Menu = new Menu();
  cierreCaja: CierreCaja = new CierreCaja();
  cierreCajaActual: CierreCaja = new CierreCaja();
  mensaje: string;

  ngOnInit() {

    const x = this.cierreCajaService.getData();
    x.snapshotChanges().subscribe(item => {
      this.cierreCajaList = [];
      item.forEach(element => {
        debugger;
        const y = element.payload.toJSON();
      //  y['$key'] = element.key;
        this.cierreCajaList.push(y as CierreCaja);

      });
      this.cierreCaja = this.cierreCajaList.find( x => x.codigo === '01');
      this.cierreCajaActual = this.cierreCajaList.find( x => x.codigo === '02');
      if (this.cierreCajaActual.estado === 0) {
        this.mensaje = 'Caja Cerrada';
      } else {
        this.mensaje = 'Caja Abierta';
      }
    });

  }

  bloquear() {
    this.cierreCaja.estado = 0;
    this.mensaje = 'Caja Cerrada';
    this.cierreCajaService.updateCierreCaja(this.cierreCaja);
  }


  desbloquear() {
    this.cierreCaja.estado = 1;
    this.mensaje = 'Caja Abierta';
    this.cierreCajaService.updateCierreCaja(this.cierreCaja);
  }
}
