import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Empleado } from "./empleado.model";

@Injectable()
export class EmpleadoService {
  empleadoList: AngularFireList<any>;
  selectedEmpleado: Empleado = new Empleado();

  constructor(private firebase: AngularFireDatabase) {}

  getData() {
    this.empleadoList = this.firebase.list("empleados");
    return this.empleadoList;
  }

  insertempleado(empleado: Empleado) {
    if (!this.empleadoList) {
      this.empleadoList = this.getData();
    }
    this.empleadoList.push({
      nombre: empleado.nombre,
      direccion: empleado.direccion,
      dni: empleado.dni,
      correo: empleado.correo,
      rol: empleado.rol,
      username: empleado.username
    });
  }

  updateempleado(empleado: Empleado) {
    debugger;
    this.empleadoList.update(empleado.$key, {
      nombre: empleado.nombre,
      direccion: empleado.direccion,
      dni: empleado.dni,
      correo: empleado.correo,
      rol: empleado.rol,
      username: empleado.username
    });
  }

  deleteempleado($key: string) {
    this.empleadoList.remove($key);
  }
}
