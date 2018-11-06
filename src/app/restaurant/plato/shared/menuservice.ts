import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Menu} from './menu.model';
@Injectable()
export class MenuService {
  menuList: AngularFireList<any>;
  selectedMenu: Menu = new Menu();


  constructor(private firebase: AngularFireDatabase ) {


   }

  getData(){
    this.menuList = this.firebase.list('menues');
    return this.menuList;
  }

  insertmenu(menu: Menu) {

    if (!this.menuList) {
      this.menuList = this.getData();
    }
      this.menuList.push({
        nombre: menu.nombre,
        descripcion: menu.descripcion,
        precio: menu.precio,
        categoria: menu.categoria,
        codigoMenu: menu.codigoMenu,
        codigoCategoria: menu.codigoCategoria,
        contadorPositivo:  menu.contadorPositivo,
        contadorNegativo: menu.contadorNegativo
    });

  }

  updatemenu(menu: Menu) {
    if (menu.descripcion === undefined) {
      menu.descripcion = '';
    }
    if (menu.codigoMenu === undefined) {
      menu.codigoMenu = 0;
    }

    this.menuList.update(menu.$key,
      {
        nombre: menu.nombre,
        descripcion: menu.descripcion,
        precio: menu.precio,
        categoria: menu.categoria,
        codigoMenu: menu.codigoMenu,
        codigoCategoria: menu.codigoCategoria,
        contadorPositivo:  menu.contadorPositivo,
        contadorNegativo: menu.contadorNegativo
      });
  }

  deletemenu($key: string) {
    this.menuList.remove($key);
  }

}
