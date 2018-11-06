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
  selector: 'app-carta-marina',
  templateUrl: './carta-marina.component.html',
  styleUrls: ['./carta-marina.component.scss']
})
export class CartaMarinaComponent implements OnInit {

  constructor(private menuService: MenuService, private tostr: ToastrService) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  menuList: Menu[];
  matcher = new MyErrorStateMatcher();
  menu: Menu = new Menu();
  nombreBuscar: string;

  ngOnInit() {
    this.nombreBuscar = '';
    this.resetForm();
    const x = this.menuService.getData();
    x.snapshotChanges().subscribe(item => {
      this.menuList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.menuList.push(y as Menu);
      });
      this.menuList = this.menuList.filter( x => x.codigoCategoria === '60');
    });

  }

  cargarLista() {
    const x = this.menuService.getData();
    x.snapshotChanges().subscribe(item => {
      this.menuList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.menuList.push(y as Menu);
      });
      this.menuList = this.menuList.filter( x => x.codigoCategoria === '60');
    });
  }

  buscar() {
    this.filtrarResultado(this.nombreBuscar);
  }
  limpiarFiltro() {
   this.cargarLista();
  }

  filtrarResultado(nombre: string) {
    debugger;
    this.menuList = this.menuList.filter( x => x.nombre.toUpperCase().includes(nombre.toUpperCase()));
    debugger;
  }
  onEdit(emp: Menu) {
    this.menuService.selectedMenu = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this carta marina ?') === true) {
      this.menuService.deletemenu(key);
      this.tostr.warning('Deleted Successfully', 'Menu register');
    }
  }

  onSubmit(menuForm: NgForm) {
    this.menu = menuForm.value;
    this.menu.codigoCategoria = '60';
    this.menu.categoria = 'Carta Marina';
    this.menu.descripcion = 'carta marina';
    this.menu.contadorNegativo = 0;
    this.menu.contadorPositivo = 0;
    if (menuForm.value.$key == null) {
      this.menuService.insertmenu(this.menu);
    } else {
      this.menuService.updatemenu(this.menu);
    }
    this.resetForm(menuForm);
    this.tostr.success('Submitted Succcessfully', 'carta marina Register');
  }

  resetForm(menuForm?: NgForm) {
    if (menuForm != null) { menuForm.reset(); }
    this.menuService.selectedMenu = {
      $key: null,
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      codigoMenu: 0,
      codigoCategoria: '',
      contadorNegativo: 0,
      contadorPositivo: 0
    };
  }

}
