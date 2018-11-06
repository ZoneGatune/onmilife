import { RankPollo } from './shared/rank_pollo.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { BoletaService } from '../boleta/shared/boletaservice';
import { Boleta } from '../boleta/shared/boleta.model';
import { MesaCrudService } from '../mesa-crud/shared/mesaCrudService';
import { DatePipe } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-ranking-pollo',
  templateUrl: './ranking_pollo.component.html',
  styleUrls: ['./ranking_pollo.component.scss']
})
export class RankingPolloComponent implements OnInit {

  constructor(private mesaCrudService: MesaCrudService,
    private boletaService: BoletaService,
     private tostr: ToastrService,
     private datePipe: DatePipe) { }
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  boletaList: Boleta[];
  rankPolloList: RankPollo[];
  rankPollo: RankPollo  = new RankPollo();
  pollo1: string;
  poll1Cant: number;
  poll2Cant: number;
  poll3Cant: number;
  poll4Cant: number;
  poll5Cant: number;
  poll6Cant: number;
  poll7Cant: number;
  poll8Cant: number;
  poll9Cant: number;
  fechaEscogida: string;
  fechaMostrar: string;

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


    private buscarRanking(fecha: string) {
      this.rankPolloList = [];
      this.poll1Cant = 0;
      this.poll2Cant = 0;
      this.poll3Cant = 0;
      this.poll4Cant = 0;
      this.poll5Cant = 0;
      this.poll6Cant = 0;
      this.poll7Cant = 0;
      this.poll8Cant = 0;
      this.poll9Cant = 0;

      const x = this.boletaService.getDataRequest(fecha);
      x.snapshotChanges().subscribe(item => {
        this.boletaList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.boletaList.push(y as Boleta);
        });

        debugger;
    this.boletaList.forEach(element => {
      console.log(element);
      const peopleArray = Object.keys(element.venta.cartaList).
      map(i => element.venta.cartaList[i]);
      const ArrayPlatos = peopleArray;
      debugger;
      ArrayPlatos.forEach(_pollo => {
        debugger;
        if (_pollo.descripcion.trim() === '10') {
            this.poll1Cant = this.poll1Cant + 1;
        }
        if (_pollo.descripcion.trim() === '20') {
          this.poll2Cant = this.poll2Cant + 1;
      }
        if (_pollo.descripcion.trim() === '30') {
          this.poll3Cant = this.poll3Cant + 1;
      }
      if (_pollo.descripcion.trim() === '40') {
        this.poll4Cant = this.poll4Cant + 1;
      }
      if (_pollo.descripcion.trim() === '50') {
        this.poll5Cant = this.poll5Cant + 1;
      }
      if (_pollo.descripcion.trim() === '60') {
        this.poll6Cant = this.poll6Cant + 1;
      }
      if (_pollo.descripcion.trim() === '70') {
        this.poll7Cant = this.poll7Cant + 1;
      }
      if (_pollo.descripcion.trim() === '80') {
        this.poll8Cant = this.poll8Cant + 1;
      }
      if (_pollo.descripcion.trim() === '90') {
        this.poll9Cant = this.poll9Cant + 1;
      }
      });
      debugger;
    });
      debugger;
      //10
      this.rankPollo.nombre = 'Oferta 60';
      this.rankPollo.cantidad = this.poll1Cant;
      this.rankPolloList.push(this.rankPollo);
      this.rankPollo = new RankPollo();
       //20
       this.rankPollo.nombre = 'Oferta 55';
       this.rankPollo.cantidad = this.poll2Cant;
       this.rankPolloList.push(this.rankPollo);
       this.rankPollo = new RankPollo();
        //30
      this.rankPollo.nombre = 'Oferta 52';
      this.rankPollo.cantidad = this.poll3Cant;
      this.rankPolloList.push(this.rankPollo);
      this.rankPollo = new RankPollo();
       //40
       this.rankPollo.nombre = '1/2 pollo';
       this.rankPollo.cantidad = this.poll4Cant;
       this.rankPolloList.push(this.rankPollo);
        //50
        this.rankPollo = new RankPollo();
      this.rankPollo.nombre = '1/4 Pollo';
      this.rankPollo.cantidad = this.poll5Cant;
      this.rankPolloList.push(this.rankPollo);
      this.rankPollo = new RankPollo();
       //60
       this.rankPollo.nombre = '1/8 pollo';
       this.rankPollo.cantidad = this.poll6Cant;
       this.rankPolloList.push(this.rankPollo);
       this.rankPollo = new RankPollo();
        //70
      this.rankPollo.nombre = 'Mostron 17';
      this.rankPollo.cantidad = this.poll7Cant;
      this.rankPolloList.push(this.rankPollo);
      this.rankPollo = new RankPollo();
       //80
       this.rankPollo.nombre = 'Mostron 13';
       this.rankPollo.cantidad = this.poll8Cant;
       this.rankPolloList.push(this.rankPollo);
       this.rankPollo = new RankPollo();
        //90
      this.rankPollo.nombre = 'Oferta 68';
      this.rankPollo.cantidad = this.poll9Cant;
      this.rankPolloList.push(this.rankPollo);
      this.rankPollo = new RankPollo();

      debugger;
    });

    console.log(this.poll1Cant);

    }

    ngOnInit() {

      const date = new Date();

      const fecha = this.datePipe.transform(date, 'yyyy_MM_dd');
      this.buscarRanking(fecha);
      this.fechaMostrar = this.datePipe.transform(date, 'yyyy-MM-dd');

  }

  verFecha() {
    debugger;
    this.fechaEscogida;
    const fecha = this.datePipe.transform(this.fechaEscogida, 'yyyy_MM_dd');
    this.fechaMostrar = this.datePipe.transform(this.fechaEscogida, 'yyyy-MM-dd');
    this.buscarRanking(fecha);
    debugger;
  }

}
