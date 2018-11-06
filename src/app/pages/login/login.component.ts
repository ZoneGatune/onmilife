import { Usuario } from './../../restaurant/loginPrincipal/shared/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioPageService } from './shared/usuarioservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarioList: Usuario[];
  usuario: Usuario = new Usuario();
  username: string;
  clave: string;
  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioPageService,
              public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.buildForm();
    const x = this.usuarioService.getData();
      x.snapshotChanges().subscribe(item => {
        this.usuarioList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          //y['$key'] = element.key;
          this.usuarioList.push(y as Usuario);

        });
      });
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }
  login() {
    debugger;
    this.usuario = this.usuarioList.find( x => x.username === this.username);
    if (this.usuario != null) {
      if (this.usuario.clave === this.clave) {
        localStorage.setItem('currentUser', JSON.stringify({ 'control' : this.usuario.username }));

        this.router.navigate(['auth/restaurant/loginMozo'],{
          queryParams: { 'control': this.usuario.username } });

      } else {
        this.snackBar.open('Usuario no existe', 'Finalizar', {
          duration: 2000,
        });
        return;
      }
    } else {
      this.snackBar.open('Usuario no existe', 'Finalizar', {
        duration: 2000,
      });
      return;
    }
  }
}

