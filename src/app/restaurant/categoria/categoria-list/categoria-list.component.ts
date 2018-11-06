import { CategoriaService } from './../shared/categoriaservice';
import { Component, OnInit, ViewEncapsulation, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { ResponsiveTableHelpers } from './helpers.data';
import { MatPaginator } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Categoria } from '../shared/categoria.model';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher  {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

displayedColumns = ['userId', 'userName', 'progress', 'color'];
rows: Array<any> = [];
  showResponsiveTableCode;
categoriaList: Categoria[];
constructor(private categoriaService: CategoriaService, private tostr: ToastrService) { }

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

  ngOnInit() {
    var x = this.categoriaService.getData();
    x.snapshotChanges().subscribe(item => {
      this.categoriaList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.categoriaList.push(y as Categoria);
      });
    });
  }

  onEdit(emp: Categoria) {
    this.categoriaService.selectedCategoria = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.categoriaService.deleteCategoria(key);
      this.tostr.warning("Deleted Successfully", "Categoria register");
    }
  }
}
