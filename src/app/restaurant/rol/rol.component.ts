import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RolService } from './shared/rolservice';
import { ToastrService } from 'ngx-toastr';
import { Rol } from './shared/rol.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  constructor(private rolService: RolService, private tostr: ToastrService) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  rolList: Rol[];

	selectedValue;
	showMultiListCode: boolean = false;
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
    const x = this.rolService.getData();
    x.snapshotChanges().subscribe(item => {
      this.rolList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.rolList.push(y as Rol);
      });
    });

  }

  onEdit(emp: Rol) {
    this.rolService.selectedRol = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.rolService.deleterol(key);
      this.tostr.warning('Deleted Successfully', 'Rol register');
    }
  }

  onSubmit(rolForm: NgForm) {
    if (rolForm.value.$key == null) {
      this.rolService.insertrol(rolForm.value);
    } else {
      this.rolService.updaterol(rolForm.value);
    }
    this.resetForm(rolForm);
    this.tostr.success('Submitted Succcessfully', 'rol Register');
  }

  resetForm(rolForm?: NgForm) {
    if (rolForm != null) {
      rolForm.reset();
    }
    this.rolService.selectedRol = {
      $key: null,
      nombre: '',
      estado: ''


    };
  }

}
