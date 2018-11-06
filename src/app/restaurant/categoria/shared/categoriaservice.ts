import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Categoria } from './categoria.model';
@Injectable()
export class CategoriaService {
  categoriaList: AngularFireList<any>;
  selectedCategoria: Categoria = new Categoria();

  constructor(private firebase: AngularFireDatabase ) {

   }

  getData() {
    this.categoriaList = this.firebase.list('Categorias');
    return this.categoriaList;
  }

  insertCategoria(categoria: Categoria) {

    if (!this.categoriaList) {
      this.categoriaList = this.getData();
    }
      this.categoriaList.push({
        nombre: categoria.nombre,
        valor: categoria.valor,
        estado: categoria.estado
    });
  }

  updateCategoria(categoria: Categoria) {
    this.categoriaList.update(categoria.$key,
      {
        nombre: categoria.nombre,
        valor: categoria.valor,
        estado: categoria.estado
      });
  }

  deleteCategoria($key: string) {
    this.categoriaList.remove($key);
  }
}
