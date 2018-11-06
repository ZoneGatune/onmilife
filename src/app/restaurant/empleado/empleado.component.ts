import { RolService } from "./../rol/shared/rolservice";
import { Component, OnInit } from "@angular/core";
import { FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ToastrService } from "ngx-toastr";
import { Empleado } from "./shared/empleado.model";
import { EmpleadoService } from "./shared/empleadoservice";
import { Rol } from "../rol/shared/rol.model";

@Component({
  selector: "app-empleado",
  templateUrl: "./empleado.component.html",
  styleUrls: ["./empleado.component.scss"]
})
export class EmpleadoComponent implements OnInit {
  constructor(
    private empleadoService: EmpleadoService,
    private rolService: RolService,
    private tostr: ToastrService
  ) {}
  displayedColumns = ["userId", "userName", "progress", "color"];
  rows: Array<any> = [];
  showResponsiveTableCode;
  empleadoList: Empleado[];
  rolList: Rol[];

  ngOnInit() {
    this.resetForm();
    var x = this.empleadoService.getData();
    x.snapshotChanges().subscribe(item => {
      this.empleadoList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.empleadoList.push(y as Empleado);
      });
    });

    var serviceObj = this.rolService.getData();
    serviceObj.snapshotChanges().subscribe(item => {
      this.rolList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.rolList.push(y as Rol);
      });
    });
  }

  onEdit(emp: Empleado) {
    debugger;
    this.empleadoService.selectedEmpleado = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.empleadoService.deleteempleado(key);
      this.tostr.warning("Deleted Successfully", "Empleado register");
    }
  }

  onSubmit(empleadoForm: NgForm) {
    debugger;
    if (empleadoForm.value.$key == null)
      this.empleadoService.insertempleado(empleadoForm.value);
    else this.empleadoService.updateempleado(empleadoForm.value);
    this.resetForm(empleadoForm);
    this.tostr.success("Submitted Succcessfully", "empleado Register");
  }

  resetForm(empleadoForm?: NgForm) {
    if (empleadoForm != null) empleadoForm.reset();
    this.empleadoService.selectedEmpleado = {
      $key: null,
      nombre: "",
      direccion: "",
      dni: "",
      correo: "",
      rol: "",
      username: ""
    };
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
