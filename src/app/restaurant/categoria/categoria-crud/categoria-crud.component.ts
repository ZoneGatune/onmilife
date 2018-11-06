import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { input_HELPERS, Messages, Links } from '../helpers.data';
import { CategoriaService } from '../shared/categoriaservice';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.scss']
})
export class CategoriaCrudComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private tostr: ToastrService) { }


 ngOnInit() {

    this.resetForm();

  }

  onSubmit(categoriaForm: NgForm) {
    if (categoriaForm.value.$key == null)
      this.categoriaService.insertCategoria(categoriaForm.value);
    else
      this.categoriaService.updateCategoria(categoriaForm.value);
    this.resetForm(categoriaForm);
    this.tostr.success('Submitted Succcessfully', 'categoria Register');
  }

  resetForm(categoriaForm?: NgForm) {
    if ( categoriaForm != null )
      categoriaForm.reset();
    this.categoriaService.selectedCategoria = {
      $key: null,
      nombre: '',
      valor: '',
      estado: '',
    }
  }

}
