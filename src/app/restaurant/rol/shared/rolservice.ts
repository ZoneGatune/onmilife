import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Rol } from './rol.model';
@Injectable()
export class RolService {
  rolList: AngularFireList<any>;
  selectedRol: Rol = new Rol();


  constructor(private firebase :AngularFireDatabase ) {


   }

  getData(){
    this.rolList = this.firebase.list('roles');
    return this.rolList;
  }

  insertrol(rol : Rol)
  {

    if(!this.rolList){
      this.rolList = this.getData();
    }
      this.rolList.push({
        nombre: rol.nombre,
        estado: rol.estado
    });

  }

  updaterol(rol : Rol){
    debugger;
    this.rolList.update(rol.$key,
      {
        nombre: rol.nombre,
        estado: rol.estado
      });
  }

  deleterol($key : string){
    this.rolList.remove($key);
  }

}
