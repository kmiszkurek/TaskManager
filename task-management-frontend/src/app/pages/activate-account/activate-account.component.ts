import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message: string = ' ';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
     this.authService.confirmAccount({token}).subscribe({
       next: () => {
         this.message = 'Account activated successfully!';
         this.submitted = true;
         this.isOkay = true;
       },
       error: (error) => {
         this.message = 'Token has been expired or invalid!';
         this.isOkay = false;
         this.submitted = true;
       }
     })
  }
}
