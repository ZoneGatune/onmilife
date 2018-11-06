import { CategoriaService } from './../categoria/shared/categoriaservice';
import { Menu } from './../plato/shared/menu.model';
import { Categoria } from './shared/categoria.model';
import { Dia } from './shared/dia.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { CartaService } from './shared/cartaservice';
import { MenuService } from '../plato/shared/menuservice';
import { Carta } from './shared/carta.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit {

  dias = new Array<Dia>();   // Use any array supports different kind objects
  categorias = new Array<Categoria>();   // Use any array supports different kind objects
  carta: Carta = new Carta();
  diaObj: Dia = new Dia();
  categoriaObj: Categoria = new Categoria();
  menuObj: Menu = new Menu();
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  cartaList: Carta[];
  menuList =  new Array<Menu>();
  menuAjaxList = new Array<Menu>();
  cartaLunesList: Carta[];
  cartaMartesList: Carta[];
  cartaMiercolesList: Carta[];
  cartaJuevesList: Carta[];
  cartaViernesList: Carta[];
  cartaSabadoList: Carta[];
  cartaDomingoList: Carta[];
  categorialist: Categoria[];

     loadDias() {
        this.dias.push({'id': '01', 'name': 'Lunes'});
        this.dias.push({'id': '02', 'name': 'Martes'});
        this.dias.push({'id': '03', 'name': 'Miercoles'});
        this.dias.push({'id': '04', 'name': 'Jueves'});
        this.dias.push({'id': '05', 'name': 'Viernes'});

        this.dias.push({'id': '06', 'name': 'Sabado'});
        this.dias.push({'id': '07', 'name': 'Domingo'});
     }

     loadCategorias() {
      this.categorias.push({'id': '01', 'name': 'Menu s/9', 'description': 'Incluye Entrada'});
    this.categorias.push({'id': '04', 'name': 'Menu s/12', 'description': 'Incluye Entrada'});
    this.categorias.push({'id': '07', 'name': 'Menu Marino', 'description': 'Incluye Entrada'});
    this.categorias.push({'id': '11', 'name': 'Menu s/10', 'description': 'Incluye Entrada'});

   }

  constructor(private cartaService: CartaService,
    private menuService: MenuService,
    private categoriaService: CategoriaService,
    private tostr: ToastrService) { }





    public cargarMenu(valorSelect: string) {

    }



  ngOnInit() {

    this.loadCategorias();
    this.resetForm();
    this.loadDias();



    const x = this.cartaService.getData();
    x.snapshotChanges().subscribe(item => {
      this.cartaList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaList.push(y as Carta);
      });
    });

    const xLunes = this.cartaService.getData();
    xLunes.snapshotChanges().subscribe(item => {
      this.cartaLunesList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaLunesList.push(y as Carta);
      });
      this.cartaLunesList = this.cartaLunesList.filter( x => x.dia === 'Lunes');

    });

    const xMartes = this.cartaService.getData();
    xMartes.snapshotChanges().subscribe(item => {
      this.cartaMartesList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaMartesList.push(y as Carta);
      });
      this.cartaMartesList = this.cartaMartesList.filter( x => x.dia === 'Martes');

    });

    const xMiercoles = this.cartaService.getData();
    xMiercoles.snapshotChanges().subscribe(item => {
      this.cartaMiercolesList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaMiercolesList.push(y as Carta);
      });
      this.cartaMiercolesList = this.cartaMiercolesList.filter( x => x.dia === 'Miercoles');

    });


    const xJueves = this.cartaService.getData();
    xJueves.snapshotChanges().subscribe(item => {
      this.cartaJuevesList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaJuevesList.push(y as Carta);
      });
      this.cartaJuevesList = this.cartaJuevesList.filter( x => x.dia === 'Jueves');

    });

    const xViernes = this.cartaService.getData();
    xViernes.snapshotChanges().subscribe(item => {
      this.cartaViernesList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaViernesList.push(y as Carta);
      });
      this.cartaViernesList = this.cartaViernesList.filter( x => x.dia === 'Viernes');

    });

    const xSabado = this.cartaService.getData();
    xSabado.snapshotChanges().subscribe(item => {
      this.cartaSabadoList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaSabadoList.push(y as Carta);
      });
      this.cartaSabadoList = this.cartaSabadoList.filter( x => x.dia === 'Sabado');

    });

    const xDomingo = this.cartaService.getData();
    xDomingo.snapshotChanges().subscribe(item => {
      this.cartaDomingoList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.cartaDomingoList.push(y as Carta);
      });
      this.cartaDomingoList = this.cartaDomingoList.filter( x => x.dia === 'Domingo');

    });

    var objMenuAjax = this.menuService.getData();
    objMenuAjax.snapshotChanges().subscribe(item => {
      this.menuList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.menuList.push(y as Menu);

      });

        this.menuAjaxList = this.menuList.filter( x => x.categoria === this.categorias[0].id);
        console.log(this.menuAjaxList);

    });
 }

  onEditCarta(emp: Carta) {
    this.cartaService.selectedCarta = Object.assign({}, emp);
  }

  onDelete(carta: Carta) {
    if (confirm('¿Esta seguro de eliminar este plato ? : ' + carta.plato) === true) {
      this.cartaService.deleteCarta(carta);
      this.tostr.warning('Deleted Successfully', 'carta register');
    }
  }


  onSubmit(cartaForm: NgForm) {
    if (cartaForm.value.$key == null) {
      debugger;

      this.carta = cartaForm.value;

      this.diaObj = this.dias.find( x => x.id === this.carta.codigoDia);
      this.carta.dia = this.diaObj.name;
      debugger;



      this.categoriaObj = this.categorias.find( x => x.id === this.carta.codigoCategoria);
      debugger;

      this.carta.categoria = this.categoriaObj.name;
      debugger;

      this.menuObj = this.menuList.find( x => x.codigoMenu === this.carta.codigoMenu);
      debugger;
      this.carta.descripcion = this.menuObj.descripcion;
      this.carta.precio = this.menuObj.precio;
      this.carta.plato = this.menuObj.nombre;
      this.carta.contadorPositivo = this.menuObj.contadorPositivo;
      this.carta.contadorNegativo = this.menuObj.contadorNegativo;
      debugger;



      this.cartaService.insertCarta( this.carta);
    } else {
      this.cartaService.updateCarta( this.carta);
    }
    this.resetForm(cartaForm);
    this.tostr.success('Submitted Succcessfully', 'carta Register');
  }

  resetForm(cartaForm?: NgForm) {
    if (cartaForm != null) {
      cartaForm.reset();
    }
    this.cartaService.selectedCarta = {
      $key: null,
      dia: '',
      plato: '',
      categoria: '',
      precio: '',
      descripcion: '',
      codigoDia: '',
      codigoMenu: 0,
      codigoCategoria: '',
      contadorPositivo: 0,
      contadorNegativo: 0


    };
  }

  onChangeCategoria(obj: Menu) {

    debugger;
    console.log(obj);
    this.menuAjaxList = this.menuList.filter( x => x.codigoCategoria === obj.codigoCategoria);
    console.log(this.menuAjaxList);
  }

}
