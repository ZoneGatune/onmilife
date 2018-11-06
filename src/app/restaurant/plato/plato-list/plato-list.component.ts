import { Component, OnInit, ViewEncapsulation, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { ResponsiveTableHelpers } from './helpers.data';
import { MatPaginator } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Menu } from '../shared/menu.model';
import { MenuService } from '../shared/menuservice';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher  {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-plato-list',
  templateUrl: './plato-list.component.html',
  styleUrls: ['./plato-list.component.scss']
})
export class PlatoListComponent implements OnInit {


displayedColumns = ['userId', 'userName', 'progress', 'color'];
rows: Array<any> = [];
  showResponsiveTableCode;
menuList: Menu[];
constructor(private menuService: MenuService, private tostr: ToastrService) { }

@ViewChild(MatPaginator) paginator1: MatPaginator;
  pageLength = 0;
  pageSize = 15;
  helpers = ResponsiveTableHelpers;
  @Input() status;
  @Input() actionStatus;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();
  nombreBuscar: string;


  ngOnInit() {
    this.nombreBuscar = '';
    var x = this.menuService.getData();
    x.snapshotChanges().subscribe(item => {
      this.menuList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.menuList.push(y as Menu);
      });
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

    });
  }


  buscar() {
    this.filtrarResultado(this.nombreBuscar);
  }
  limpiarFiltro() {
   this.cargarLista();
  }

  filtrarResultado(nombre: string) {

    this.menuList = this.menuList.filter( x => x.nombre.toUpperCase().includes(nombre.toUpperCase()));

  }

  onEdit(emp: Menu) {
    debugger;
    this.menuService.selectedMenu = Object.assign({}, emp);
    debugger;
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.menuService.deletemenu(key);
      this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }
}
