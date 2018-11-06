import { Menu } from './../plato/shared/menu.model';
import { Carta1 } from './../carta/shared/carta1.model';
import { VentaSeleccionadaService } from './../lista-menu/shared/ventaService';
import { VentaSeleccionada } from './../lista-menu/shared/venta.model';
import { CartaSeleccionadaService } from './shared/cartaSeleccionadaservice';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { CartaService } from '../carta/shared/cartaservice';
import { Carta } from '../carta/shared/carta.model';
import { Categoria } from '../carta/shared/categoria.model';
import { CartaSeleccionada } from './shared/cartaSeleccionada.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MenuService } from '../plato/shared/menuservice';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-menu-postre',
  templateUrl: './menu-postre.component.html',
  styleUrls: ['./menu-postre.component.scss'],
  providers: [VentaSeleccionadaService]
})
export class MenuPostreComponent implements OnInit {

  constructor(private menuService: MenuService, private tostr: ToastrService,
    private route: ActivatedRoute,
    private ventaSeleccionadaService: VentaSeleccionadaService,
    public router: Router,
    public snackBar: MatSnackBar) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  cartaList: Carta[];
  menuList: Menu[];
  entradaList: Carta[];
  categorias = new Array<Categoria>();   // Use any array supports different kind objects
  ventaKey: string;
  selectedValue;
  showMultiListCode = false;
  value = 'Clear me';
  ventaSeleccionada: VentaSeleccionada = new VentaSeleccionada();
  menuSeleccionado: Menu = new Menu();
  carta1: Carta1 = new Carta1();
  cartaSeleccionadas = new Array<Carta1>();
  ventasList: VentaSeleccionada[];
  ventaList: VentaSeleccionada[];
  mesa: string;
  codigoMesa: string;
  codigoMozo: string;
  mozo: string;

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.cartaSeleccionadas = [];
    const x = this.menuService.getData();
    x.snapshotChanges().subscribe(item => {
      this.menuList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.menuList.push(y as Menu);
      });
      this.menuList = this.menuList.filter( x => x.codigoCategoria === '50');
    });

    this.route.queryParams
    .subscribe(params => {
      console.log(params); // {order: "popular"}
      this.ventaKey = params['ventaKey'];
      this.mozo = params['mozo'];
      this.codigoMozo = params['codigoMozo'];
      this.codigoMesa = params['codigoMesa'];
      this.mesa = params['mesa'];
    });
    const xVentaSeleccionada = this.ventaSeleccionadaService.getData();
    xVentaSeleccionada.snapshotChanges().subscribe(item => {
      this.ventasList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.ventasList.push(y as VentaSeleccionada);
      });
      this.ventaSeleccionada = this.ventasList.find( x => x.$key === this.ventaKey);
    });
  }

  agregarEntrada(entrada: Menu) {
    if (this.ventaSeleccionada) {
      this.menuSeleccionado = entrada;
      // agregando solo la carta.
      this.carta1 = new  Carta1();
      this.carta1.key = entrada.$key;
      this.carta1.categoria = entrada.categoria;
      this.carta1.codigoCategoria = entrada.codigoCategoria;
      if (entrada.codigoMenu === undefined) {
        this.carta1.codigoMenu = 0;
      } else {
        this.carta1.codigoMenu = entrada.codigoMenu;
      }
      this.carta1.descripcion = entrada.descripcion;
      this.carta1.precio = entrada.precio;
      this.carta1.plato = entrada.nombre;
      this.cartaSeleccionadas.push(this.carta1);
      if (this.ventaSeleccionada.cartaList === undefined) {
        this.ventaSeleccionada.cartaList = new Array<Carta1>();
      }
      const peopleArray = Object.keys(this.ventaSeleccionada.cartaList).map(i => this.ventaSeleccionada.cartaList[i]);
      peopleArray.push(this.carta1);
      this.ventaSeleccionada.cartaList = peopleArray;
      this.snackBar.open('Se añadio el plato : ' + this.carta1.plato, 'Gracias', {
        duration: 2000,
      });
    }
  }

  retroceder() {
    this.router.navigate(['/auth/restaurant/listaMenu'], {
      queryParams: {'ventaKey': this.ventaSeleccionada.$key,
                    'codigoMesa': this.ventaSeleccionada.codigoMesa,
                    'mesa': this.ventaSeleccionada.mesa,
                    'mozo': this.ventaSeleccionada.mozo,
                    'codigoMozo': this.ventaSeleccionada.codigoMozo } });
  }

  grabarMenu() {
      this.ventaSeleccionadaService.updateVenta(this.ventaSeleccionada.$key, this.ventaSeleccionada);
      this.router.navigate(['/auth/restaurant/listaMenu'], {
        queryParams: {'ventaKey': this.ventaSeleccionada.$key,
                      'codigoMesa': this.ventaSeleccionada.codigoMesa,
                      'mesa': this.ventaSeleccionada.mesa,
                      'mozo': this.ventaSeleccionada.mozo,
                      'codigoMozo': this.ventaSeleccionada.codigoMozo } });
    }
}
