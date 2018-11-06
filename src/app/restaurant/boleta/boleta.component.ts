import { VentaSeleccionada } from './../lista-menu/shared/venta.model';
import { debug } from 'util';
import { Boleta } from './shared/boleta.model';
import { MenuService } from './../plato/shared/menuservice';
import { Menu } from './../plato/shared/menu.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { VentaSeleccionadaService } from '../lista-menu/shared/ventaService';
import { Carta1 } from '../carta/shared/carta1.model';
import { BoletaService } from './shared/boletaservice';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.scss']
})
export class BoletaComponent implements OnInit {

  constructor(private menuService: MenuService, private tostr: ToastrService, private ventaService: VentaSeleccionadaService,
    private route: ActivatedRoute, private ventaSeleccionadaService: VentaSeleccionadaService,
    private boletaService: BoletaService, public router: Router ) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  menuList: Menu[];
  matcher = new MyErrorStateMatcher();
  menu: Menu = new Menu();
  boleta: Boleta = new Boleta();
  venta: VentaSeleccionada = new VentaSeleccionada();
  ventaSeleccionada: VentaSeleccionada = new VentaSeleccionada();
  ventaList: VentaSeleccionada[];
  arrayVentaList = new Array<Carta1>();
  esFactura: boolean;
  mostrarCamposFactura: boolean;
  ngOnInit() {

    this.resetForm();
    this.esFactura = false;
    this.mostrarCamposFactura = true;
    this.route.queryParams
    .subscribe(params => {
      console.log(params); // {order: "popular"}
      // const e = new Boleta();
      // Object.assign(e, params);
      // this.boleta = e;
      const ventaS = new VentaSeleccionada();
      Object.assign(ventaS, params);
      this.venta = ventaS;
      debugger;
      console.log(this.venta); // popular
    });

    const x = this.ventaSeleccionadaService.getData();
      x.snapshotChanges().subscribe(item => {
        this.ventaList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.ventaList.push(y as VentaSeleccionada);

        });
        //  this.menuObj = this.menuList.find( x => x.codigoMenu === this.carta.codigoMenu);
        debugger;
        this.ventaSeleccionada = this.ventaList.find( x => x.$key === this.venta.$key);

        if (this.ventaSeleccionada.cartaList) {
          const peopleArray = Object.keys(this.ventaSeleccionada.cartaList).
                  map(i => this.ventaSeleccionada.cartaList[i]);
            this.arrayVentaList = peopleArray;
          }
          this.boleta.total = 0;
          let i = 0;
          this.arrayVentaList.forEach(element => {
              debugger;
              const precioNumber = +element.precio;
              i++;
              this.boleta.total = this.boleta.total + precioNumber;
              debugger;
            });

        this.boleta.codigoMesa = this.ventaSeleccionada.codigoMesa;
        this.boleta.mesa = this.ventaSeleccionada.mesa;
        this.boleta.venta = this.ventaSeleccionada;
        this.boleta.totalPlatos = i;
        this.boleta.estado = 'activo';
        this.boleta.tipoDocumento = 'Boleta';
        this.boleta.rucCliente = '';
        this.boleta.nombreCliente = '';

      });


  }
  convertirFactura() {
      this.boleta.tipoDocumento  = 'Factura';
      this.mostrarCamposFactura = false;
  }

  convertirBoleta() {
    this.boleta.tipoDocumento  = 'Boleta';
    this.mostrarCamposFactura = true;
}
  onEdit(emp: Menu) {
    this.menuService.selectedMenu = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this Bebida ?') === true) {
      this.menuService.deletemenu(key);
      this.tostr.warning('Deleted Successfully', 'Menu register');
    }
  }


  pagar(menuForm: NgForm) {


          this.boletaService.insertBoleta(this.boleta);
          debugger;
          this.ventaService.deleteVenta(this.ventaSeleccionada.$key);
      debugger;

          let printContents, popupWin;
          printContents = document.getElementById('print-section').innerHTML;
          popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
          popupWin.document.open();
          popupWin.document.write(`
            <html>
              <head>
                <title>Print tab</title>
                <style>
                //........Customized style.......
                </style>
              </head>
          <body onload="window.print();window.close()">${printContents}</body>
            </html>`
          );
          popupWin.document.close();
          this.retroceder();

  }

  retroceder() {
    this.router.navigate(['/auth/restaurant/listaMenu'], {
      queryParams: {'ventaKey': this.ventaSeleccionada.$key,
                    'codigoMesa': this.ventaSeleccionada.codigoMesa,
                    'mesa': this.ventaSeleccionada.mesa,
                    'mozo': this.ventaSeleccionada.mozo,
                    'codigoMozo': this.ventaSeleccionada.codigoMozo } });
  }


  resetForm(menuForm?: NgForm) {

  }



}
