import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule
       } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { UsuarioPageService } from './shared/usuarioservice';
import { MatSnackBarModule } from '@angular/material';

const routes: Routes = [
    {path: '', component: LoginComponent},
  ];
@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
      LoginComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [
      UsuarioPageService
    ]
})
export class LoginModule {
}
