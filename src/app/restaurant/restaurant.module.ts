import { MenuBarbanComponent } from './contenedor-menu/menu-barban.component';
import { BarbanComponent } from './barban/barban.component';
import { Menu3Component } from './contenedor-menu/menu3.component';

import { CajaService } from './cuadre-caja/shared/cajaservice';
import { CuadreCajaComponent } from './cuadre-caja/cuadre-caja.component';
import { MenuGaseosaComponent } from './contenedor-menu/menu-gaseosa.component';
import { GaseosaComponent } from './gaseosa/gaseosa.component';
import { RankingPolloComponent } from './ranking/ranking_pollo.component';
import { CierreCajaService } from './cierre-caja/shared/cierrecajaservice';
import { MenuEntradaComponent } from './contenedor-menu/menu-entrada.component';
import { EntradaComponent } from './entradas/entrada.component';
import { CartaMarinaComponent } from './carta-marina/carta-marina.component';
import { MenuParillaComponent } from './contenedor-menu/menu-parrilla.component';
import { BoletaComponent } from './boleta/boleta.component';
import { MenuPostreComponent } from './contenedor-menu/menu-postre.component';
import { BebidaComponent } from './bebida/bebida.component';
import { MenuCartaCriollaComponent } from './contenedor-menu/menu-carta-criolla.component';
import { CartaCriollaComponent } from './carta-criolla/carta-criolla.component';
import { VentaSeleccionadaService } from './lista-menu/shared/ventaService';

import { Menu2Component } from './contenedor-menu/menu2.component';
import { Menu1Component } from './contenedor-menu/menu1.component';
import { ListaMenuComponent } from './lista-menu/lista-menu.component';
import { CartaService } from './carta/shared/cartaservice';
import { CartaComponent } from './carta/carta.component';
import { MesaCrudService } from './mesa-crud/shared/mesaCrudService';
import { MesaCrudComponent } from './mesa-crud/mesa-crud.component';
import { EmpleadoService } from './empleado/shared/empleadoservice';
import { EmpleadoComponent } from './empleado/empleado.component';
import { RolService } from './rol/shared/rolservice';
import { RolComponent } from './rol/rol.component';
import { CategoriaService } from './categoria/shared/categoriaservice';
import { CategoriaComponent } from './categoria/categoria.component';
import { PlatoListComponent } from './plato/plato-list/plato-list.component';
import { NgModule } from '@angular/core';
import {
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule
       } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core/core.module';
import { MesaComponent } from './mesa/mesa.component';
import { RestaurantRouterModule } from './restaurant.routes';
import { PlatoComponent } from './plato/plato.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuService } from './plato/shared/menuservice';
import { PlatoCrudComponent } from './plato/plato-crud/plato-crud.component';
import { MatTableModule } from '@angular/material/table';
import { CategoriaCrudComponent } from './categoria/categoria-crud/categoria-crud.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginMozoComponent } from './login-mozo/login-mozo.component';
import { MatSnackBarModule } from '@angular/material';
import { CartaSeleccionada } from './contenedor-menu/shared/cartaSeleccionada.model';
import { MenuBebidaComponent } from './contenedor-menu/menu-bebida.component';
import { PolloBrasaComponent } from './pollo-brasa/pollo-brasa.component';
import { MenuPolloBrasaComponent } from './contenedor-menu/menu-pollo-brasa.component';
import { PostreComponent } from './postre/postre.component';
import { BoletaService } from './boleta/shared/boletaservice';
import { ParrillaComponent } from './parrillas/parrilla.component';
import { MenuMarinoComponent } from './contenedor-menu/menu-marino.component';
import { MenuCartaMarinoComponent } from './contenedor-menu/menu-carta-marino.component';
import { CierreCajaComponent } from './cierre-caja/cierre-caja.component';
import { VentaComponent } from './venta/venta.component';
import {DatePipe} from '@angular/common';
import { UsuarioService } from './loginPrincipal/shared/usuarioservice';
import { LoginPrincipalComponent } from './loginPrincipal/login-secure.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material';


@NgModule({
    imports: [

    MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        CoreModule,
        RestaurantRouterModule,
        MatNativeDateModule,
        FormsModule,
        MatMenuModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatSortModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDatepickerModule
       ],
    declarations: [
        MesaComponent,
        PlatoComponent,
        PlatoCrudComponent,
        PlatoListComponent,
        CategoriaComponent,
        CategoriaCrudComponent,
        CategoriaListComponent,
        RolComponent,
        EmpleadoComponent,
        MesaCrudComponent,
        CartaComponent,
        ListaMenuComponent,
        Menu1Component,
        Menu2Component,
        LoginMozoComponent,
        CartaCriollaComponent,
        MenuCartaCriollaComponent,
        BebidaComponent,
        MenuBebidaComponent,
        MenuMarinoComponent,
        PolloBrasaComponent,
        MenuPolloBrasaComponent,
        PostreComponent,
        MenuPostreComponent,
        BoletaComponent,
        ParrillaComponent,
        MenuParillaComponent,
        CartaMarinaComponent,
        MenuCartaMarinoComponent,
        EntradaComponent,
        MenuEntradaComponent,
        CierreCajaComponent,
        VentaComponent,
        RankingPolloComponent,
        GaseosaComponent,
        MenuGaseosaComponent,
        CuadreCajaComponent,
        LoginPrincipalComponent,
        Menu3Component,
        BarbanComponent,
        MenuBarbanComponent
    ],
    exports: [
    ],
    providers: [
      MenuService,
      CategoriaService,
      RolService,
      EmpleadoService,
      MesaCrudService,
      CartaService,
      CartaSeleccionada,
      VentaSeleccionadaService,
      BoletaService,
      CierreCajaService,
      DatePipe,
      CajaService,
      UsuarioService
    ]
})
export class RestaurantModule {
}
