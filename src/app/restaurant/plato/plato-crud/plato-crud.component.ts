import { Menu } from './../shared/menu.model';
import { Categoria } from "./../../categoria/shared/categoria.model";
import { CategoriaService } from "./../../categoria/shared/categoriaservice";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { input_HELPERS, Messages, Links } from "../helpers.data";
import { MenuService } from "../shared/menuservice";
import { ToastrService } from "ngx-toastr";

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
  selector: "app-plato-crud",
  templateUrl: "./plato-crud.component.html",
  styleUrls: ["./plato-crud.component.scss"]
})
export class PlatoCrudComponent implements OnInit {
  constructor(
    private menuService: MenuService,
    private categoriaService: CategoriaService,
    private tostr: ToastrService
  ) {}
  selectedValue: string;
  InputHelpers: any = input_HELPERS;
  links = Links;
  showMultiListCode: boolean = false;
  messages = Messages;
  value = "Clear me";
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  emailFormControls = new FormControl("", [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);
  matcher = new MyErrorStateMatcher();
  categoriaList: Categoria[];
  menuListObj: Menu[];
  nombreBuscar: string;

  ngOnInit() {
    this.nombreBuscar = '';
    this.resetForm();

    var x = this.categoriaService.getData();
    x.snapshotChanges().subscribe(item => {
      this.categoriaList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.categoriaList.push(y as Categoria);
      });
    });

    //capturando el valor maximo de la lista
    debugger;
    var xMenuObj = this.menuService.getData();
    if(xMenuObj != null){
      debugger;

      xMenuObj.snapshotChanges().subscribe(item => {
        this.menuListObj = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["$key"] = element.key;
          this.menuListObj.push(y as Menu);
        });
      });

    }

  }


  menu: Menu = new Menu();
  categoria: Categoria = new Categoria();

  onSubmit(menuForm: NgForm) {
    this.selectedValue;

    if (menuForm.value.$key == null) {
      debugger;


      this.menu = menuForm.value;
      debugger;
      let xValues = this.menuListObj.map(function(o) { return o.codigoMenu; });

      xValues = Array.from(this.menuListObj, o => o.codigoMenu);
      xValues = xValues.filter(element => element !== undefined);
      const xMax = Math.max.apply(null, xValues);

      this.categoria = this.categoriaList.find( x => x.valor === this.menu.codigoCategoria);
      this.menu.categoria = this.categoria.nombre;
      debugger;
      this.menu.contadorPositivo = 0;
      this.menu.contadorNegativo = 0;
      this.menu.codigoMenu = xMax + 1;
      this.menuService.insertmenu(this.menu);
    } else {
      this.menu = menuForm.value;
      this.categoria = this.categoriaList.find( x => x.valor === this.menu.codigoCategoria);
      this.menu.categoria = this.categoria.nombre;
      debugger;
      this.menu.contadorPositivo = 0;
      this.menu.contadorNegativo = 0;
      this.menu.codigoMenu = 1;
      this.menuService.updatemenu(this.menu);
    }

    debugger;
    this.resetForm(menuForm);
    this.tostr.success("Submitted Succcessfully", "Menu Register");
  }

  cargarLista() {
    const xMenuObj = this.menuService.getData();
    if (xMenuObj != null){
      debugger;

      xMenuObj.snapshotChanges().subscribe(item => {
        this.menuListObj = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["$key"] = element.key;
          this.menuListObj.push(y as Menu);
        });
      });

  }
}


  buscar() {
    this.filtrarResultado(this.nombreBuscar);
  }
  limpiarFiltro() {
   this.cargarLista();
  }

  filtrarResultado(nombre: string) {
    debugger;
    this.menuListObj = this.menuListObj.filter( x => x.nombre.toUpperCase().includes(nombre.toUpperCase()));
    debugger;
  }

  resetForm(menuForm?: NgForm) {
    if (menuForm != null) menuForm.reset();
    this.menuService.selectedMenu = {
      $key: null,
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: '',
      codigoMenu: 0,
      codigoCategoria: '',
      contadorNegativo: 0,
      contadorPositivo: 0
    };
  }
}
