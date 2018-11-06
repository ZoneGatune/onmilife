import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cdk-login-secure',
  templateUrl: './login-secure.component.html',
  styleUrls: ['./login-secure.component.scss']
})

export class LoginPrincipalComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['auth/restaurant/LoginComponent']);
  }
}
