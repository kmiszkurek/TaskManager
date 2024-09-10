import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenService} from "../../services/token/token.service";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: '', password: ''}
  errorMsg: Array<string> = [];
  private secretKey = 'my-secret-key';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  login() {
    this.errorMsg = [];

    const data = JSON.stringify(this.authRequest);
    const encrypted = CryptoJS.AES.encrypt(data, this.secretKey).toString();

    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register(){
    this.router.navigate(['register']);
  }
}
