import { debug } from 'util';
import { Boleta } from './../boleta/shared/boleta.model';
import { Carta1 } from './../carta/shared/carta1.model';
import { VentaSeleccionada } from './shared/venta.model';
import { VentaSeleccionadaService } from './shared/ventaService';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { CartaService } from '../carta/shared/cartaservice';
import { Carta } from '../carta/shared/carta.model';
import { Categoria } from '../carta/shared/categoria.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-menu.component.html',
  styleUrls: ['./lista-menu.component.scss']
})
export class ListaMenuComponent implements OnInit {

  constructor(private cartaService: CartaService, private tostr: ToastrService, public router: Router ,
    private route: ActivatedRoute, private firebase: AngularFireDatabase,  private ventaSeleccionadaService: VentaSeleccionadaService) {
      this.mostrarVentaList = [];
      this.getData();
    }

  ventaListFire: AngularFireList<any>;

  getData() {
    this.ventaListFire = this.firebase.list('ventas');
    return this.ventaListFire;
  }

  deleteVenta($key: string) {
    debugger;
    this.ventaListFire.remove($key);
  }

  liberarMesa() {
    debugger;
    //this.deleteVenta(this.ventaSeleccionada.$key);
    debugger;
    this.router.navigate(['/auth/restaurant/mesa'], {
      queryParams: {'mozo': this.mozo,
                    'codigoMozo': this.codigoMozo } });
   // this.irAMesa();
  }

  irAMesa(){
    this.router.navigate(['/auth/restaurant/mesa'], {
      queryParams: {'ventaKey': this.ventaKey,
                    'codigoMesa': this.codigoMesa,
                    'mesa': this.mesa,
                    'mozo': this.mozo,
                    'codigoMozo': this.codigoMozo,
                    'mesaLiberada': true } });
  }

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  CartaList: Carta[];
  ventaList: VentaSeleccionada[];
  categorias = new Array<Categoria>();   // Use any array supports different kind objects
  categoriasMenu = new Array<Categoria>();
  selectedValue;
  showMultiListCode = false;
  value = 'Clear me';
  ventaKey: string;
  mesa: string;
  codigoMesa: string;
  codigoMozo: string;
  mozo: string;
  ventaSeleccionada: VentaSeleccionada = new VentaSeleccionada();
  boleta: Boleta = new Boleta();
  mostrarVentaList = new Array<Carta1>();
  boletaCartaList = new Array<Carta1>();
  listaVentaActualizada = new Array<Carta1>();
  mesaLiberada: boolean;

  matcher = new MyErrorStateMatcher();

  loadCategoriasMenu() {
    this.categoriasMenu.push({'id': '100', 'name': 'Entradas o Adicionales', 'description': ''});
    this.categoriasMenu.push({'id': '01', 'name': 'Menú Criollo s/ 9', 'description': 'Incluye Entrada'});
    this.categoriasMenu.push({'id': '11', 'name': 'Menu s/ 10', 'description': 'Incluye Entrada'});
    this.categoriasMenu.push({'id': '04', 'name': 'Menu Ejecutivo s/ 12', 'description': 'Incluye Entrada'});
    this.categoriasMenu.push({'id': '07', 'name': 'Menú Marino', 'description': ''});

  }

  loadCategorias() {
    this.categorias.push({'id': '20', 'name': 'Carta Criolla', 'description': ''});
    this.categorias.push({'id': '60', 'name': 'Carta Marina', 'description': ''});
    this.categorias.push({'id': '30', 'name': 'Pollos a la Brasa', 'description': ''});
    this.categorias.push({'id': '80', 'name': 'Parrillas', 'description': ''});
    this.categorias.push({'id': '25', 'name': 'Bebidas', 'description': ''});
    this.categorias.push({'id': '26', 'name': 'Gaseosas', 'description': ''});
    this.categorias.push({'id': '50', 'name': 'Postres', 'description': ''});
    this.categorias.push({'id': '31', 'name': 'Barban', 'description': ''});



 }

  ngOnInit() {
    debugger;
    this.loadCategorias();
    this.loadCategoriasMenu();

    this.route.queryParams
    .subscribe(params => {
      console.log(params); // {order: "popular"}
debugger;
      this.ventaKey = params['ventaKey'];
      this.mozo = params['mozo'];
      this.codigoMozo = params['codigoMozo'];
      this.codigoMesa = params['codigoMesa'];
      this.mesa = params['mesa'];
      this.mesaLiberada = params['mesaLiberada'];

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

        this.ventaSeleccionada = this.ventaList.find( x => x.codigoMesa === this.codigoMesa);

        if (this.ventaSeleccionada.cartaList) {
          const peopleArray = Object.keys(this.ventaSeleccionada.cartaList).map(i => this.ventaSeleccionada.cartaList[i]);

          this.mostrarVentaList = peopleArray;
          console.log(this.mostrarVentaList);
        }

        //
      });

  }

  Onclick(categoria: Categoria) {

    if (categoria.id === '01') {
      this.router.navigate(['/auth/restaurant/menu1'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '04') {
      this.router.navigate(['/auth/restaurant/menu2'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '20') {
      this.router.navigate(['/auth/restaurant/menuCartaCriolla'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '25') {
      this.router.navigate(['/auth/restaurant/menuBebida'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '07') {
      this.router.navigate(['/auth/restaurant/menuMarino'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '30') {
      this.router.navigate(['/auth/restaurant/menuPolloBrasa'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '50') {
      this.router.navigate(['/auth/restaurant/menuPostre'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '90') {
      this.router.navigate(['/auth/restaurant/menuParrilla'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '60') {
      this.router.navigate(['/auth/restaurant/menuCartaMarina'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '100') {
      this.router.navigate(['/auth/restaurant/menuEntrada'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '26') {
      this.router.navigate(['/auth/restaurant/menuGaseosa'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '11') {
      this.router.navigate(['/auth/restaurant/menu3'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
    if (categoria.id === '31') {
      this.router.navigate(['/auth/restaurant/menuBarban'], {
        queryParams: {'ventaKey': this.ventaKey,
                      'codigoMesa': this.codigoMesa,
                      'mesa': this.mesa,
                      'mozo': this.mozo,
                      'codigoMozo': this.codigoMozo } });
    }
  }

  onDelete(carta1: Carta1) {

    this.mostrarVentaList = this.mostrarVentaList.filter(obj => obj.key !== carta1.key);
    this.ventaSeleccionada.cartaList = this.mostrarVentaList;
    this.ventaSeleccionadaService.updateVenta(this.ventaSeleccionada.$key, this.ventaSeleccionada);


  }

  print() {
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
}



  cobrarMesa(venta: VentaSeleccionada) {
    debugger;
    // this.boleta.total = 0;
    // if (this.ventaSeleccionada.cartaList) {
    //   const peopleArray = Object.keys(this.ventaSeleccionada.cartaList).
    //         map(i => this.ventaSeleccionada.cartaList[i]);
    //   this.boletaCartaList = peopleArray;
    // }

    //   this.boletaCartaList.forEach(element => {
    //   console.log("wenasass");
    //   console.log(element);
    //   const precioNumber = +element.precio;
    //   this.boleta.total = this.boleta.total + precioNumber;

    // });
    // debugger;
    // this.boleta.codigoMesa = venta.codigoMesa;
    // this.boleta.mesa = venta.mesa;
    // this.boleta.venta = venta;
    this.router.navigate(['/auth/restaurant/boleta'], { queryParams: venta });
  }

}
