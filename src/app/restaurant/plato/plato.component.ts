import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { input_HELPERS, Messages, Links } from './helpers.data';
import { MenuService } from './shared/menuservice';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss']
})
export class PlatoComponent implements OnInit {

  constructor(private menuService: MenuService, private tostr: ToastrService) { }

  InputHelpers: any = input_HELPERS;
	links = Links;
	selectedValue;
	showMultiListCode: boolean = false;
	messages = Messages;
	value = 'Clear me';
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	emailFormControls = new FormControl('', [
		Validators.required,
		Validators.pattern(EMAIL_REGEX)]);
  matcher = new MyErrorStateMatcher();



	ngOnInit() {

    this.resetForm();

  }

  onSubmit(menuForm: NgForm) {
    if (menuForm.value.$key == null)
      this.menuService.insertmenu(menuForm.value);
    else
      this.menuService.updatemenu(menuForm.value);
    this.resetForm(menuForm);
    this.tostr.success('Submitted Succcessfully', 'Menu Register');
  }

  resetForm(menuForm?: NgForm) {
    if (menuForm != null)
      menuForm.reset();
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


    }
  }

}
