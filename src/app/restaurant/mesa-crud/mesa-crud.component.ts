import { MesaCrud } from './shared/mesa-crud.model';
import { MesaCrudService } from './shared/mesaCrudService';
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
  selector: 'app-mesa-crud',
  templateUrl: './mesa-crud.component.html',
  styleUrls: ['./mesa-crud.component.scss']
})
export class MesaCrudComponent implements OnInit {

  constructor(private mesaCrudService: MesaCrudService, private tostr: ToastrService) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  mesaCrudList: MesaCrud[];

  selectedValue;
  showMultiListCode = false;
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
      const x = this.mesaCrudService.getData();
      x.snapshotChanges().subscribe(item => {
        this.mesaCrudList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.mesaCrudList.push(y as MesaCrud);
        });
    });

  }

  onEdit(obj: MesaCrud) {
    this.mesaCrudService.selectedMesaCrud = Object.assign({}, obj);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.mesaCrudService.deleterol(key);
      this.tostr.warning('Deleted Successfully', 'Rol register');
    }
  }

  onSubmit(mesaCrudForm: NgForm) {
    if (mesaCrudForm.value.$key == null) {
      this.mesaCrudService.insertMesaCrud(mesaCrudForm.value);
    } else {
      this.mesaCrudService.updateMesaCrud(mesaCrudForm.value);
    }
    this.resetForm(mesaCrudForm);
    this.tostr.success('Submitted Succcessfully', 'rol Register');
  }

  resetForm(mesaCrudForm?: NgForm) {
    if (mesaCrudForm != null) {
    mesaCrudForm.reset();
    }
    this.mesaCrudService.selectedMesaCrud = {
      $key: null,
      nombre: '',
      numero: '',
      estado: ''
    };
  }

}
